import {
  it,
  inject,
  beforeEachProviders
} from '@angular/core/testing';

import {TestComponentBuilder} from '@angular/compiler/testing';
// Load the implementations that should be tested
import {AppComponent} from './app';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AppComponent
  ]);

  it('should have a url', inject([ AppComponent ], (app) => {
    expect(app.url).toEqual('https://mustrace.com');
  }));

});
