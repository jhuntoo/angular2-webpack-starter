import {
  it,
  inject,
  beforeEachProviders,
  beforeEach,
  expect,
} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';
import {BaseRequestOptions, Http, ResponseOptions, Response} from 'angular2/http';
import {Component, provide} from 'angular2/core';
import {Config} from '../../config/config';
import {LocalStorage, MockLocalStorage} from './local-storage';
import {AuthenticationService} from './authentication';
import {SocialLoginResult} from "./authentication";


describe('*** Authentication Service ****', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
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

  describe('On load', () => {
    it('should set isLoggedIn to false', inject([AuthenticationService], (service) => {
      expect(service.isLoggedIn).toBeFalsy();
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

});






