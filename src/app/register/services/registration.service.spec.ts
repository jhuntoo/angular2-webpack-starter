import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  beforeEach,
  TestComponentBuilder,
  expect,
} from 'angular2/testing';

import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {Component, provide} from 'angular2/core';

// Load the implementations that should be tested
import {RegistrationService} from './registration.service';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';
import {ResponseOptions} from 'angular2/http';
import {Response} from 'angular2/http';
import {EmailCheckResult} from '../models/EmailCheckResult';
import {Config} from '../../../config/config';
import {throwError} from 'rxjs/util/throwError';
import {RegisterResponse} from '../models/registerResponse';


describe('Register Service', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function (backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    provide(Config, { useValue: {apiBaseUrl : '/test'} }),
    RegistrationService,
  ]);

  describe('checkEmail', () => {
    describe('Poorly formed Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: 'bad response'}))));
      }));
      it('should return an error', inject([RegistrationService], (service) => {
        service.checkEmail('joe@example.com').subscribe((result: EmailCheckResult) => {
          expect(result.error).toBeTruthy();
        },err => fail('This is a malformed json response, not a http error'));
      }));
    });
    describe('A non 200 Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        const baseResponse = new Response(new ResponseOptions({body: null, status: 500 }));
        backend.connections.subscribe((c:MockConnection) => c.mockRespond(baseResponse));
      }));
      it('should return an error', inject([RegistrationService], (service) => {
        service.checkEmail('joe@example.com').subscribe((result: EmailCheckResult) => {
          expect(result.error).toBeTruthy();
        },err => fail('This is a malformed json response, not a network error'));
      }));
    });
    describe('A good 200 Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: { available: true }, status: 200 }))));
      }));
      it('should return the availability of the email', inject([RegistrationService], (service) => {
        service.checkEmail('joe@example.com').subscribe((result: EmailCheckResult) => {
          expect(result.available).toBeTruthy();
        },err => fail('This is a correct response, not a network error'));
      }));
    });
  });

  describe('register', () => {
    describe('Poorly formed Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: 'bad response'}))));
      }));
      it('should return an error', inject([RegistrationService], (service) => {
        service.register('joe@example.com', 'password').subscribe((response: RegisterResponse) => {
          expect(response.error).toBeTruthy();
        },err => fail('This is a malformed json response, not a http error'));
      }));
    });
    describe('A non 200 Response', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        const baseResponse = new Response(new ResponseOptions({body: null, status: 500 }));
        backend.connections.subscribe((c:MockConnection) => c.mockRespond(baseResponse));
      }));
      it('should return an error', inject([RegistrationService], (service) => {
        service.register('joe@example.com', 'password').subscribe((response: RegisterResponse) => {
          expect(response.error).toBeTruthy();
        },err => fail('This is a malformed json response, not a network error'));
      }));
    });
    describe('A good 200 Response with success', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: { success: true }, status: 200 }))));
      }));
      it('should return successful ', inject([RegistrationService], (service) => {
        service.register('joe@example.com', 'password').subscribe((response: RegisterResponse) => {
          expect(response.success).toBeTruthy();
        },err => fail('This is a correct response, not a network error'));
      }));
      it('should not already exist ', inject([RegistrationService], (service) => {
        service.register('joe@example.com', 'password').subscribe((response: RegisterResponse) => {
          expect(response.alreadyExists).toBeFalsy();
        },err => fail('This is a correct response, not a network error'));
      }));
    });
    describe('A good 200 Response but the email already exists', () => {
      beforeEach(inject([MockBackend], (backend:MockBackend) => {
        backend.connections.subscribe((c:MockConnection) =>
          c.mockRespond(new Response(new ResponseOptions({body: { success: false, exists: true }, status: 200 }))));
      }));
      it('should return that the email exists', inject([RegistrationService], (service) => {
        service.register('joe@example.com', 'password').subscribe((response: RegisterResponse) => {
          expect(response.alreadyExists).toBeTruthy();
        },err => fail('This is a correct response, not a network error'));
      }));
      it('should return not successful', inject([RegistrationService], (service) => {
        service.register('joe@example.com', 'password').subscribe((response: RegisterResponse) => {
          expect(response.success).toBeFalsy();
        },err => fail('This is a correct response, not a network error'));
      }));
    });
  });

});






