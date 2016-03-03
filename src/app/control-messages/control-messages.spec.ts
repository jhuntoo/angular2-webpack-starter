//import {
//  it,
//  injectAsync,
//  fdescribe,
//  beforeEachProviders,
//  TestComponentBuilder,
//
//
//} from 'angular2/testing';
//
//import {BrowserDomAdapter} from "angular2/src/platform/browser/browser_adapter";
//BrowserDomAdapter.makeCurrent();
//
//import {Component, provide} from 'angular2/core';
//
//// Load the implementations that should be tested
//import {ControlMessages} from './control-messages';
//import {ComponentFixture} from 'angular2/testing';
//
//let validTemplate = ` <form [ngFormModel]="form" (ngSubmit)="onSubmit()">
//           <input id="email" type="email" ngControl="email">
//           <control-messages control="email"></control-messages>
//           <div ngControlGroup="matchingPassword">
//            <input id="password" type="password" ngControl="password">
//            <control-messages control="matchingPassword/password"></control-messages>
//            <input id="confirmPassword" type="password" ngControl="confirmPassword">
//            <control-messages control="matchingPassword/confirmPassword"></control-messages>
//          </div>
//          <control-messages control="matchingPassword"></control-messages>
//        </form>`;
//
//// Create a test component to test directives
//@Component({
//  selector: "irrelevant",
//  template : validTemplate,
//  directives: [ ControlMessages ]
//})
//class ValidComponent { message = "Irrelevant"; }
//
//
//fdescribe('control-messages conponent', () => {
//
//  fdescribe('given a valid <form> template', () => {
//    fdescribe('and no elements have been touched', () => {
//      skip ('should not display any messages', injectAsync([TestComponentBuilder], (tcb) => {
//        return tcb.createAsync(ValidComponent).then((fixture) => {
//            fixture.detectChanges();
//          //console.log(`fixure: ${JSON.stringify(fixture)}`)
//          //  let nativeElement = fixture.nativeElement;
//          //  expect(nativeElement.querySelector('#validation-error').toBe(null));
//          });
//      }));
//    });
//
//  });
//
//});
