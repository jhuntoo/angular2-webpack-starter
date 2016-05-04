import {Component, Host} from '@angular/core';
import {NgFormModel} from '@angular/common';
import {ValidationService} from '../validation/ValidationService';
import {NgControlGroup} from '@angular/common';
import {ControlArray} from '@angular/common';
import {ControlGroup} from '@angular/common';
import {Control} from '@angular/common';
import {Input} from '@angular/core';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'control-messages',
  styles: [ require('./control-messages.css').toString()],
  template: `<span *ngIf='errorMessage !== null' class='validation-error'>{{errorMessage}}</span>`,
})
export class ControlMessages {
  @Input() control: string;
  constructor(@Host() private _formDir: NgFormModel) { }

  get errorMessage() {
    console.log(`ControlName: ${this.control}`);
    let messageControl = this._formDir.form.find(this.control);
    if (messageControl === null) return null;
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
        if (propertyName === 'required') return 'Required';
        return messageControl.errors[propertyName];
      }
    }
    return null;
  }
}
