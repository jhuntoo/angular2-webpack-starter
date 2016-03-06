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
import {MockConnection} from "angular2/src/http/backends/mock_backend";
import {ResponseOptions} from "angular2/http";
import {Response} from "angular2/http";




describe('Register Service', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
  ]);

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    const baseResponse = new Response(new ResponseOptions({body: 'got response'}));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  describe('checkEmail', () => {
    it('should default emailCheckResult to null', inject([ RegistrationService ], (service) => {
      service.checkEmail("joe@example.com").subscribe((response : Response) => {
        expect(response.request.)
      })
    }));
  });
});






