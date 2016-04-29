import {
  it,
  inject,
  beforeEachProviders,
  beforeEach,
  expect,
} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';

import {AppComponent} from '../app';
import { RootRouter } from 'angular2/src/router/router';
import { RouteParams, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import {Location} from 'angular2/platform/common';
import { SpyLocation } from 'angular2/src/mock/location_mock';

import {BaseRequestOptions, Http, ResponseOptions, Response} from 'angular2/http';
import {Component, provide} from 'angular2/core';
import {Config} from '../../config/config';
import {LocalStorage, MockLocalStorage} from './local-storage';
import {AuthenticationService, SocialLoginResult, LoginResult} from './authentication';
import {LoggingService} from './log';
import {TokenExpiryChecker, MockTokenExpiryChecker} from './authentication';


describe('*** Authentication Service ****', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    LoggingService,
    RouteRegistry,
    provide(TokenExpiryChecker, {useClass: MockTokenExpiryChecker}),
    provide(Router, {useClass: RootRouter}),
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(LocalStorage, {useValue: new MockLocalStorage()}),
    provide(Config, {useValue: {apiBaseUrl: '/test'}}),
    provide(Http, {
      useFactory: function (backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    AuthenticationService,
  ]);

  describe('On load with - No existing token', () => {
    it('should set isLoggedIn to false', inject([AuthenticationService], (service) => {
      expect(service.isLoggedIn).toBeFalsy();
    }));
  });

  describe('On load - with existing token', () => {
    let localStorage = new MockLocalStorage();
    beforeEachProviders(() => [
      provide(LocalStorage, {useValue: localStorage}),
    ]);
    beforeEach(() => {
      localStorage.set('jwt', 'TOKEN');
    });
    it('should set isLoggedIn to true', inject([AuthenticationService], (service) => {
      expect(service.isLoggedIn).toBeTruthy();
    }));
  });

  describe('On setToken called', () => {
    describe('with a value', () => {
      beforeEach(inject([AuthenticationService], (service:AuthenticationService) => {
        service.setToken('TEST_TOKEN');
      }));
      it('should set token in localStorage', inject([LocalStorage], (localStorage:LocalStorage) => {
        expect(localStorage.get('jwt')).toEqual('TEST_TOKEN');
      }));
      it('should set isLoggedIn to true', inject([AuthenticationService], (service:AuthenticationService) => {
        expect(service.isLoggedIn).toBeTruthy();
      }));
      it('should fire $loginStatusChanged event', inject([AuthenticationService], (service:AuthenticationService) => {
        service.$loginStatusChanged.subscribe((isLoggedIn:boolean) => {
          expect(isLoggedIn).toBeTruthy();
        }, err => fail('No Error should have occured'));
      }));
    });
    describe('with no value', () => {
      beforeEach(inject([AuthenticationService], (service:AuthenticationService) => {
        service.setToken(null);
      }));
      it('should not set token in localStorage', inject([LocalStorage], (localStorage:LocalStorage) => {
        expect(localStorage.get('jwt')).toBeFalsy();
      }));
      it('should not change isLoggedIn', inject([AuthenticationService], (service:AuthenticationService) => {
        expect(service.isLoggedIn).toBeFalsy();
      }));
      it('should not fire $loginStatusChanged event', inject([AuthenticationService], (service:AuthenticationService) => {
        service.$loginStatusChanged.subscribe((isLoggedIn:boolean) => {
          fail('$loginStatusChanged should not have fired');
        });
      }));
    });
  });

  describe('On completeSocialLogin called', () => {
    describe('Poorly formed Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: 'bad response'}))));
      }));
      it('should return an error', inject([AuthenticationService], (service:AuthenticationService) => {
        service.completeSocialLogin('IRRELEVANT').subscribe((result: SocialLoginResult) => {
          expect(result.success).toBeFalsy();
        },err => fail('This is a malformed json response, not a http error'));
      }));
      it('should NOT login', inject([AuthenticationService], (service:AuthenticationService) => {
        expect(service.isLoggedIn).toBeFalsy();
      }));
    });
    describe('valid response with token', () => {
      let localStorage = new MockLocalStorage();
      beforeEachProviders(() => [
        provide(LocalStorage, {useValue: localStorage}),
      ]);
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: { token: 'TEST_TOKEN_2', type : 'new' }, status: 200 } ))));
      }));
      it('should NOT return an error', inject([AuthenticationService], (service:AuthenticationService) => {
        service.completeSocialLogin('IRRELEVANT').subscribe((result: SocialLoginResult) => {
          expect(result.success).toBeTruthy();
        },err => fail('should not fail'));
      }));
      it('should set token in localStorage', () => {
        expect(localStorage.get('jwt')).toEqual('TEST_TOKEN_2');
      });
      it('should set isLoggedIn to true', inject([AuthenticationService], (service:AuthenticationService) => {
        service.completeSocialLogin('IRRELEVANT').subscribe((result: SocialLoginResult) => {
          expect(service.isLoggedIn).toBeTruthy();
        },err => fail('should not fail'));
      }));
    });

  });

  describe('On login called', () => {
    describe('Poorly formed Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: 'bad response'}))));
      }));
      it('should return an error', inject([AuthenticationService], (service:AuthenticationService) => {
        service.login('IRRELEVANT','PASSWORD' ).subscribe((result: LoginResult) => {
          expect(result.success).toBeFalsy();
        },err => fail('This is a malformed json response, not a http error'));
      }));
      it('should NOT login', inject([AuthenticationService], (service:AuthenticationService) => {
        expect(service.isLoggedIn).toBeFalsy();
      }));
    });
    describe('valid response with login success & token', () => {
      let localStorage = new MockLocalStorage();
      beforeEachProviders(() => [
        provide(LocalStorage, {useValue: localStorage}),
      ]);
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: { token: 'TEST_TOKEN_3', success : true }, status: 200 } ))));
      }));
      it('should NOT return an error', inject([AuthenticationService], (service:AuthenticationService) => {
        service.login('IRRELEVANT','PASSWORD').subscribe((result: LoginResult) => {
          expect(result.success).toBeTruthy();
        },err => fail('should not fail'));
      }));
      it('should set token in localStorage', () => {
        expect(localStorage.get('jwt')).toEqual('TEST_TOKEN_3');
      });
      it('should set isLoggedIn to true', inject([AuthenticationService], (service:AuthenticationService) => {
        service.login('IRRELEVANT', 'PASSWORD').subscribe((result: LoginResult) => {
          expect(service.isLoggedIn).toBeTruthy();
        },err => fail('should not fail'));
      }));
    });
    describe('valid response with login unsuccessful', () => {
      let localStorage = new MockLocalStorage();
      beforeEachProviders(() => [
        provide(LocalStorage, {useValue: localStorage}),
      ]);
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: {  success : false }, status: 401 } ))));
      }));
      it('should NOT return an error', inject([AuthenticationService], (service:AuthenticationService) => {
        service.login('IRRELEVANT','PASSWORD').subscribe((result: LoginResult) => {
          expect(result.success).toBeFalsy();
        },err => fail('should not fail'));
      }));
      it('should set isLoggedIn to false', inject([AuthenticationService], (service:AuthenticationService) => {
        service.login('IRRELEVANT', 'PASSWORD').subscribe((result: LoginResult) => {
          expect(service.isLoggedIn).toBeFalsy();
        },err => fail('should not fail'));
      }));
    });

    describe('valid response with login unsuccessful and alternativeProfiles', () => {
      let localStorage = new MockLocalStorage();
      beforeEachProviders(() => [
        provide(LocalStorage, {useValue: localStorage}),
      ]);
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: {  success : false, alternativeProfiles: ['google'] }, status: 401 } ))));
      }));
      it('should return alternativeProfiles', inject([AuthenticationService], (service:AuthenticationService) => {
        service.login('IRRELEVANT','PASSWORD').subscribe((result: LoginResult) => {
          expect(result.alternativeProfiles).toEqual(['google']);
        },err => fail('should not fail'));
      }));
    });


  });

  describe('On logout called', () => {
    let localStorage = new MockLocalStorage();
    let location, router;
    beforeEachProviders(() => [
      provide(LocalStorage, {useValue: localStorage}),
      RouteRegistry,
      provide(Location, { useClass: SpyLocation }),
      provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppComponent }),
      provide(Router, {useClass: RootRouter})
    ]);

    beforeEach(inject([AuthenticationService,MockBackend, Router, Location], (service:AuthenticationService, backend:MockBackend, r: Router, l : Location) => {
      location = l;
      router = r;
      backend.connections.subscribe((c:MockConnection) =>
        c.mockRespond(new Response(new ResponseOptions({body: { token: 'TEST_TOKEN_3', success : true }, status: 200 } ))));
        service.login('IRRELEVANT','PASSWORD' ).subscribe(() => {
          expect(service.isLoggedIn).toBeTruthy();
            service.logout();
        });

    }));

      it('should remove token in localStorage', inject([LocalStorage], (localStorage:LocalStorage) => {
        expect(localStorage.get('jwt')).toBeFalsy();
      }));


      it('should logout', inject([AuthenticationService], (service:AuthenticationService) => {
          expect(service.isLoggedIn).toBeFalsy();
      }));

    it('should navigate back to index page', inject([AuthenticationService], (service:AuthenticationService) => {
      service.login('IRRELEVANT','PASSWORD' ).subscribe(() => {
        expect(service.isLoggedIn).toBeTruthy();
        router.navigate(['Profile']).then(() => {
          expect(location.path()).toEqual('/profile','did not navigate to /profile');
          service.logout().subscribe(() => {
            expect(location.path()).toEqual('');
          });
        });
      });
    }));

  });

});






