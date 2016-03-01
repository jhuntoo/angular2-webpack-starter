import {Component, Host} from 'angular2/core';
import {NgFormModel} from 'angular2/common';
import {ValidationService} from '../validation/ValidationService';
import {NgControlGroup} from "angular2/common";
import {ControlArray} from "angular2/common";
import {ControlGroup} from "angular2/common";
import {Control} from "angular2/common";

@Component({
  selector: 'control-messages',
  inputs: ['controlName: control'],
  styles: [ require('./control-messages.css').toString()],
  template: `<div *ngIf="errorMessage !== null" class="validation-error">{{errorMessage}}</div>`
})
export class ControlMessages {
  controlName: string;
  constructor(@Host() private _formDir: NgFormModel) { }

  get errorMessage() {
    let messageControl = this._formDir.form.find(this.controlName);
    let shouldReportError : boolean = false;

    if (messageControl instanceof Control) {
      shouldReportError = messageControl.touched;
    } else if (messageControl instanceof ControlGroup) {
      let controlGroup = (messageControl as ControlGroup);
      let allTouched = true;
       for (let key in controlGroup.controls) {
           let subControl = controlGroup.controls[key];
           if (!subControl.touched) {
             allTouched = false;
             break;
           }

       }
      shouldReportError = allTouched;
    }

    for (let propertyName in messageControl.errors) {
      if (messageControl.errors.hasOwnProperty(propertyName) && shouldReportError) {
        return ValidationService.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }
}
