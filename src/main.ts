/*
 * Providers provided by Angular
 */
import * as ngCore from '@angular/core';
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES
} from '@angular/router-deprecated';
import {COMPILER_PROVIDERS} from '@angular/compiler/src/compiler';
import { Title, BROWSER_APP_COMMON_PROVIDERS } from '@angular/platform-browser';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {FORM_PROVIDERS, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {Config} from './config/config';
import {LoggingService, Level} from './app/common/log';
import {AUTHENTICATION_PROVIDERS} from './app/common/authentication';

import {LOCAL_STORAGE_PROVIDERS} from '../src/app/common/local-storage';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

//let options = {
//  autoDismiss: false,
//  positionClass: 'toast-bottom-right',
//};

/*
 * App Component
 * our top level component that holds all of our components
 */
import {RootComponent} from './root';
import {AuthHttp, AuthConfig} from './app/temp/angular2-jwt';
import {PROFILE_PROVIDERS} from './app/common/profile-service';
import {SeoService} from './app/common/seo-service';
import {SPORT_PROVIDERS} from './common/sport/sport-service';
import {CURRENCY_PROVIDERS} from './common/currency/currency-service';
//import {RouterActive} from './app/directives/router-active';

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
// application_providers: providers that are global through out the application
const APPLICATION_PROVIDERS = [
  ...BROWSER_APP_COMMON_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  ...COMPILER_PROVIDERS,
  ...FORM_PROVIDERS,
  ...LOCAL_STORAGE_PROVIDERS,
  ...AUTHENTICATION_PROVIDERS,
  ...PROFILE_PROVIDERS,
  ...ANGULAR2_GOOGLE_MAPS_PROVIDERS,

  ngCore.provide(LocationStrategy, {useClass: HashLocationStrategy})
];

// application_directives: directives that are global through out the application
const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES
];

// application_pipes: pipes that are global through out the application
const APPLICATION_PIPES = [];

// Environment
if ('production' === ENV) {
  // Production
  ngCore.enableProdMode();
} else {
  // Development
}


/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  let config = ('production' === ENV) ? require('./config/production.ts').config : require('./config/dev.ts').config;
  console.log(`config: ${JSON.stringify(config)}`);
  return bootstrap(RootComponent, [
      ...APPLICATION_PROVIDERS,
      ...SPORT_PROVIDERS,
      ...CURRENCY_PROVIDERS,
      Title,
      { provide: ngCore.PLATFORM_DIRECTIVES, useValue: APPLICATION_DIRECTIVES, multi: true},
      { provide:ngCore.PLATFORM_PIPES, useValue: APPLICATION_PIPES, multi: true},
      //ngCore.provide(ToastOptions, { useValue: new ToastOptions(options)}),
      { provide: Config, useValue: config},
      { provide: LoggingService, useValue: new LoggingService()},
      { provide: SeoService,  useClass: SeoService},
      { provide: AuthHttp,
        useFactory: (http) => {
          console.log(`useFactory`);
          return new AuthHttp(new AuthConfig({ tokenName: 'jwt', headerPrefix: 'JWT',}), http);
        },
        deps: [Http]
      }
    ])
    .catch(err => console.error(err));
}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
  // bootstrap after document is ready
  return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === ENV) {
  // activate hot module reload
  if (HMR) {
    if (document.readyState === 'complete') {
      main();
    } else {
      bootstrapDomReady();
    }
    module.hot.accept();
  } else {
    bootstrapDomReady();
  }
} else {
  bootstrapDomReady();
}


