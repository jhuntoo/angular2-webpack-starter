import {
  it,
  inject,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {AppComponent} from '../app';
import { RootRouter } from 'angular2/src/router/router';
import { RouteParams, Router, RouteRegistry, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { Location } from 'angular2/platform/common';
import { SpyLocation } from 'angular2/src/mock/location_mock';


// Load the implementations that should be tested
import {Home} from './home';
import {Title} from './services/title';

describe('*** Home ***', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
    provide(Router, {useClass: RootRouter}),
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Title,
    Home
  ]);

  it('should have default data', inject([ Home ], (home) => {
    expect(home.data).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Home ], (home) => {
    expect(!!home.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
