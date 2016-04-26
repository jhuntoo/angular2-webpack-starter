import {Component, Input, ChangeDetectionStrategy, ChangeDetectorRef} from 'angular2/core';
import {Validators, FormBuilder, AbstractControl, Control, ControlGroup} from 'angular2/common';
import {LoggingService, Logger} from '../../app/common/log';
import {EventCategoryRegistrationType} from './models/EventCategoryRegistrationType';
//import {AgeRestrictionItem, AgeRestrictionItemValueAccessor} from './age-restriction';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {DateInputDirective} from '../../common/date-input';
import {Select} from '../../app/temp/select/select';
import {CurrencyService, Currency} from '../../common/currency/currency-service';
import {StringMapWrapper} from 'angular2/src/facade/collection';

class Validation {
  public static isAgeRestrictionValid = (group: ControlGroup): any => {
    let enabled = group.controls['enabled'].value;

    if (!enabled) {
      console.log(`isAgeRestrictionValid: enabled=true`);
      return null;
    }

    let min = group.controls['min'].value;
    let max = group.controls['max'].value;
    let date = group.controls['date'].value;
    console.log(`isAgeRestrictionValid: min=${min}, max=${max}, date=${JSON.stringify(date)}`);
    if ((!min && !max) || !date || date === '') {
      return {
        'invalidAgeRestriction': 'At least a minimum or maximum age must be supplied with an "As of" date'
    };
    }

    return null;
  }
}

@Component({
  selector: 'registration-type-item',  // <home></home>
  directives: [DateInputDirective, Select],
  template: require('./registration-type-item.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationTypeItem {

  @Input() model: EventCategoryRegistrationType;
  log:Logger;
  currencies: Currency[] = [];
  initialSelected: Currency[] =  [{ id: 'GBP', text: 'GBP'}];
  title:string = '';
  form:ControlGroup;
  type:Control;
  description:Control;
  capacity:Control;
  cost:Control;
  closureDate:  Control;
  currency: Control;
  arEnabled: Control;
  arMin: Control;
  arMax: Control;
  arDate: Control;
  ageRestriction: any;

  constructor(private cd: ChangeDetectorRef,
              logginService: LoggingService,
              private fb:FormBuilder,
              currencyService : CurrencyService) {
    this.log = logginService.getLogger('RegistrationTypeItem');
    this.buildForm();

    this.model = new EventCategoryRegistrationType();
    this.currencies = currencyService.getCurrencies();
    this.setCurrency('GBP');

  }

  updateModel(type : EventCategoryRegistrationType) {
    this.log.debug(`updateModel" ${JSON.stringify(type)}`);
    this.model = type;
    // TODO: follow this https://github.com/angular/angular/pull/7288
    //TODO: convert these fields to custom form controls which use ngModel
    this.closureDate.updateValue(type.registrationClosureDate);
    this.type.updateValue(type.type);


    //if (this.model.type === 'GROUP') {
    //  this.log.debug(`GROUP`);
    //   this.checkModel = {individual: false, group: true };
    //} else {
    //  this.checkModel = {individual: true, group: false };
    //}

    //this.buildForm();
    this.cd.markForCheck(); // Tell angular to detect changes.

  }

  //clear() {
  //  this.log.debug(`clear()`);
  //  // TODO: This is a hack, follow this https://github.com/angular/angular/pull/7288
  //  this.form['_touched'] = false;
  //  StringMapWrapper.forEach(this.form.controls, (control: AbstractControl, name: string) => {
  //    control['_touched'] = false;
  //  });
  //}

  typeChanged(type: string, ev : MouseEvent) {
    this.log.debug(`typeChanged: ${type}`);
    this.setType(type);

  }

  onCurrencyChanged(event) {
    this.log.debug(`onCurrencyChanged: distance= ${JSON.stringify(event.text )}`);
    this.setCurrency(event.id);
  }



  onCurrencyRemoved(event) {
    this.currency.updateValue('');
  }

  private buildForm()  {
    this.log.debug(`buildForm`);
    this.type = new Control('', Validators.required);
    this.description = new Control('',Validators.required);
    this.capacity = new Control('', Validators.required);
    this.cost = new Control('', Validators.required);
    this.closureDate = new Control('', Validators.required);
    this.currency = new Control('', Validators.required);
    this.arEnabled = new Control('', Validators.required);
    this.arDate = new Control('');


    //if (this.model && this.model.ageRestriction.enabled) {
    //  this.arDate = new Control('', Validators.required);
    //}

    this.ageRestriction = this.fb.group({
      enabled : this.arEnabled,
      min : this.arMin,
      max : this.arMax,
      date: this.arDate
    }, {validator: Validation.isAgeRestrictionValid });


    this.form = this.fb.group({
      type: this.type,
      description: this.description,
      capacity: this.capacity,
      closureDate : this.closureDate,
      cost : this.cost,
      currency : this.currency,
      ageRestriction : this.ageRestriction
    });
    //this.type.updateValue(this.model.type);
    //this.description.updateValue(this.model.description);
    //this.capacity.updateValue(this.model.capacity);
    //this.currency.updateValue(this.model.currencyCode);
    //this.cost.updateValue(this.model.cost);
    //this.closureDate.updateValue(this.model.registrationClosureDate);
  }

  private setType(type: string) {
    this.model.type = type;
    this.type.updateValue(type);
  }

  private setCurrency(currency: string) {
    this.model.currencyCode = currency;
    this.currency.updateValue(currency);
  }

  get value(): string {
    return JSON.stringify(this.form.value, null, 2);
  }


}
