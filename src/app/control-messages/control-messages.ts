import {Component, Host} from 'angular2/core';
import {NgFormModel} from 'angular2/common';
import {ValidationService} from '../validation/ValidationService';
import {NgControlGroup} from 'angular2/common';
import {ControlArray} from 'angular2/common';
import {ControlGroup} from 'angular2/common';
import {Control} from 'angular2/common';
import {Input} from 'angular2/core';
import {ChangeDetectionStrategy} from 'angular2/core';

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
