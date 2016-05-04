import {
  it,
  inject,
  beforeEachProviders,
  beforeEach,
  expect
} from '@angular/core/testing';

import {TestComponentBuilder} from '@angular/compiler/testing';
import {BaseRequestOptions, Http} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {MockConnection} from '@angular/http/testing/mock_backend';
import {Component, provide, DynamicComponentLoader, ApplicationRef} from '@angular/core';

// Load the implementations that should be tested
import {RegisterForm} from './register';
import {EmailCheckResult} from './models/EmailCheckResult';
import {RegistrationService, MockRegistrationService} from './services/registration.service';
import {LoggingService,
  AuthenticationService,
  MockAuthenticationService,
  SeoService,
  MockSeoService} from '../common/index';
import {AppComponent} from '../app';

import { RootRouter } from '@angular/router-deprecated/src/router';
import { RouteParams, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT} from '@angular/router-deprecated';

import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {SocialLogin} from '../common/social-login';
import {Config} from '../../config/config';


let mockedServiceEmailAvailable = MockRegistrationService.withMocked(EmailCheckResult.available());


describe('RegisterForm', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    DynamicComponentLoader,
    ApplicationRef,
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(Router, {useClass: RootRouter}),
    provide(Http, {
      useFactory: function (backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),
    provide(RegistrationService, {useValue: new MockRegistrationService()}),
    provide(SeoService, {useValue: new MockSeoService()}),
    provide(AuthenticationService, {useValue: new MockAuthenticationService()}),
    provide(LoggingService, {useValue: new LoggingService()}),
    RegisterForm,
    provide(Config, { useValue: {apiBaseUrl : '/test'} }),
    SocialLogin
  ]);


  describe('when loaded', () => {
    it('should default emailCheckResult to null', inject([RegisterForm], (form) => {
      expect(form.emailTaken).toBeUndefined();
    }));

    it('should default isCheckingEmail to false', inject([RegisterForm], (form) => {
      expect(form.isCheckingEmail).toBeFalsy();
    }));

    it('should default isSubmitting to false', inject([RegisterForm], (form) => {
      expect(form.isSubmitting).toBeFalsy();
    }));
    it('should default isNetworkError to false', inject([RegisterForm], (form) => {
      expect(form.isNetworkError).toBeFalsy();
    }));

    describe('email', () => {
      it('should be blank', inject([RegisterForm], (form) => {
        expect(form.email.value).toBe('');
      }));
      it('should not be valid', inject([RegisterForm], (form) => {
        expect(form.email.valid).toBeFalsy();
      }));
      it('should not be dirty', inject([RegisterForm], (form) => {
        expect(form.email.dirty).toBeFalsy();
      }));
      it('should not be touched', inject([RegisterForm], (form) => {
        expect(form.email.touched).toBeFalsy();
      }));
      it('should have required error', inject([RegisterForm], (form) => {
        expect(form.email.hasError('required')).toBeTruthy();
      }));
    });

    describe('password', () => {
      it('should be blank', inject([RegisterForm], (form) => {
        expect(form.password.value).toBe('');
      }));
      it('should not be valid', inject([RegisterForm], (form) => {
        expect(form.password.valid).toBeFalsy();
      }));
      it('should not be dirty', inject([RegisterForm], (form) => {
        expect(form.password.dirty).toBeFalsy();
      }));
      it('should not be touched', inject([RegisterForm], (form) => {
        expect(form.password.touched).toBeFalsy();
      }));
      it('should have required error', inject([RegisterForm], (form) => {
        expect(form.password.hasError('required')).toBeTruthy();
      }));
    });
    describe('confirmPassword', () => {
      it('should be blank', inject([RegisterForm], (form) => {
        expect(form.confirmPassword.value).toBe('');
      }));
      it('should not be valid', inject([RegisterForm], (form) => {
        expect(form.confirmPassword.valid).toBeFalsy();
      }));
      it('should not be dirty', inject([RegisterForm], (form) => {
        expect(form.confirmPassword.dirty).toBeFalsy();
      }));
      it('should not be touched', inject([RegisterForm], (form) => {
        expect(form.confirmPassword.touched).toBeFalsy();
      }));
      it('should have required error', inject([RegisterForm], (form) => {
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






