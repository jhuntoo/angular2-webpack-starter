/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ToastOptions} from 'ng2-toastr/ng2-toastr';
import {Config} from './config/config';
import {LoggingService, Level} from './app/common/log';

let options = {
  autoDismiss: false,
  positionClass: 'toast-bottom-right',
};

/*
 * App Environment Providers
 * providers that only live in certain environment
 */
const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
  ngCore.enableProdMode();
  ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
  ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  let config = ('production' === process.env.ENV)  ? require('./config/production.ts').config : require('./config/dev.ts').config;
  console.log(`config: ${JSON.stringify(config)}`);
  return browser.bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ngCore.provide(ToastOptions, { useValue: new ToastOptions(options)}),
    ngCore.provide(Config, { useValue: config}),
    ngCore.provide(LoggingService, { useValue: new LoggingService()})
  ])
  .catch(err => console.error(err));
}


/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
  // bootstrap after document is ready
  return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === process.env.ENV) {
  // activate hot module reload
  if (process.env.HMR) {
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

//import './assets/css/component.css';
//import './assets/css/cssparallax.css';
//import './assets/css/reset.css';
//import './assets/css/responsivemobile.css';
//import './assets/css/style.css';
import 'ng2-toastr/ng2-toastr.js';
import 'ng2-toastr/ng2-toastr.css';
import 'font-awesome-webpack!../font-awesome.config.js';
