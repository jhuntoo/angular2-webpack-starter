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
import {Component, provide, DynamicComponentLoader, ApplicationRef} from 'angular2/core';

// Load the implementations that should be tested
import {RegisterForm} from './register';
import {EmailCheckResult} from './models/EmailCheckResult';
import {RegistrationService, MockRegistrationService} from './services/registration.service';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';


let mockedServiceEmailAvailable = MockRegistrationService.withMocked(EmailCheckResult.available())


describe('RegisterForm', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    DynamicComponentLoader,
    ApplicationRef,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    provide(ToastOptions, { useValue: new ToastOptions({})}),
    provide(RegistrationService, { useValue: new MockRegistrationService()}),
    ToastsManager,
    RegisterForm
  ]);



  describe('when loaded', () => {
    it('should default emailCheckResult to null', inject([ RegisterForm ], (form) => {
      expect(form.emailTaken).toBeUndefined();
    }));

    it('should default checkingEmail to false', inject([ RegisterForm ], (form) => {
      expect(form.checkingEmail).toBeFalsy();
    }));

    describe('email', () => {
      it('should be blank', inject([ RegisterForm ], (form) => {
        expect(form.email.value).toBe("");
      }));
      it('should not be valid', inject([ RegisterForm ], (form) => {
        expect(form.email.valid).toBeFalsy();
      }));
      it('should not be dirty', inject([ RegisterForm ], (form) => {
        expect(form.email.dirty).toBeFalsy();
      }));
      it('should not be touched', inject([ RegisterForm ], (form) => {
        expect(form.email.touched).toBeFalsy();
      }));
      it('should have required error', inject([ RegisterForm ], (form) => {
        expect(form.email.hasError('required')).toBeTruthy();
      }));
    });

    describe('password', () => {
      it('should be blank', inject([ RegisterForm ], (form) => {
        expect(form.password.value).toBe("");
      }));
      it('should not be valid', inject([ RegisterForm ], (form) => {
        expect(form.password.valid).toBeFalsy();
      }));
      it('should not be dirty', inject([ RegisterForm ], (form) => {
        expect(form.password.dirty).toBeFalsy();
      }));
      it('should not be touched', inject([ RegisterForm ], (form) => {
        expect(form.password.touched).toBeFalsy();
      }));
      it('should have required error', inject([ RegisterForm ], (form) => {
        expect(form.password.hasError('required')).toBeTruthy();
      }));
    });
    describe('confirmPassword', () => {
      it('should be blank', inject([ RegisterForm ], (form) => {
        expect(form.confirmPassword.value).toBe("");
      }));
      it('should not be valid', inject([ RegisterForm ], (form) => {
        expect(form.confirmPassword.valid).toBeFalsy();
      }));
      it('should not be dirty', inject([ RegisterForm ], (form) => {
        expect(form.confirmPassword.dirty).toBeFalsy();
      }));
      it('should not be touched', inject([ RegisterForm ], (form) => {
        expect(form.confirmPassword.touched).toBeFalsy();
      }));
      it('should have required error', inject([ RegisterForm ], (form) => {
        expect(form.confirmPassword.hasError('required')).toBeTruthy();
      }));
    });




  });

//  describe('when a valid email is entered', () => {
//    let form;
//    let ob
//    let mock;
//
//    beforeEachProviders(() => [
//      provide(RegistrationService, { useValue: mockedServiceEmailAvailable}),
//    ]);
//
//    beforeEach(inject([ RegisterForm ], (form : RegisterForm) => {
//       form = form;
//       spyOn(mockedServiceEmailAvailable, 'checkEmail');
//       form.email.updateValue('joe@example.com');
//
//    }));
//    it('should have required error', inject([ RegisterForm ], (form) => {
//      //expect((<any>mockedServiceEmailAvailable.checkEmail).calls.argsFor(0)).toEqual(['joe@example.com']);
//    }));
//});

  });






