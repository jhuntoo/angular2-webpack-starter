import {Component, Input, Output, HostBinding, HostListener, Directive, EventEmitter, forwardRef, Provider, ViewChild} from '@angular/core';
import {EventCategory} from '../models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';
import {Select} from 'ng2-select/ng2-select';
import {AgeRestriction} from '../models/AgeRestriction';
import {DateInputDirective} from '../../common/date-input';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';

@Component({
  selector: 'age-restriction',  // <home></home>
  directives: [DateInputDirective],
  styles: [ require('./age-restriction.less').toString()],
  template: require('./age-restriction.html')
})
export class AgeRestrictionItem {

  @Input() model: AgeRestriction;
  @Output() valueChange: EventEmitter<AgeRestriction> = new EventEmitter<AgeRestriction>();
  log:Logger;

  onFocusValueMap: {[key: string]: any} = {}

  @ViewChild('ageRestrictionContainer') container;

  @HostBinding('tabindex') class:string = '-1';
  @HostListener('blur')
  onLoseFocus() {
    console.log(`onLoseFocus`);
    if (this.valueChange)  {this.valueChange.emit(this.model)};
  }

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('AgeRestrictionItem');
  }

  onFocus(control, value) {
    console.log(`onFocus: control=${control}, value=${value}`);
    this.onFocusValueMap[control] = value;
    if (this.container) {this.container.nativeElement.focus();}

  }

  onMinInput(event : Event): void {
    console.log(`onMinInput: event=${JSON.stringify(event)}`);
    event.stopPropagation();
    event.preventDefault();
    //if (this.valueChange)  {this.valueChange.emit(this.model)};
  }
  onMinBlur(event : Event): void {
    console.log(`onMinBlur: event=${JSON.stringify(event)}`);
    event.stopPropagation();
    event.preventDefault();
    //if (this.valueChange)  {this.valueChange.emit(this.model)};
  }
  onMaxChanged(): void {
    console.log(`onMaxChanged`);
    if (this.valueChange)  {this.valueChange.emit(this.model)};
  }
  onDateChanged(): void {
    console.log(`onDateChanged`);
    if (this.valueChange)  {this.valueChange.emit(this.model)};
  }


  ngAfterViewInit() {

  }

}

//@Directive({
//  selector: 'age-restriction',
//  host: {'(valueChange)': 'onChange($event)'}
//})
//export class LabelsValueAccessor implements ControlValueAccessor {
//  onChange = (_) => {};
//  onTouched = () => {};
//
//  constructor(private host: AgeRestrictionItem) {
//
//  }
//
//  writeValue(value: any): void {
//    this.host.setValue(value);
//  }
//
//  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
//  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
//}

const CUSTOM_VALUE_ACCESSOR = new Provider(
  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => AgeRestrictionItemValueAccessor), multi: true});

@Directive({
  selector: 'age-restriction',
  host: {'(valueChange)': 'onChange($event)'/*, '(blur)': 'onTouched()'*/},
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class AgeRestrictionItemValueAccessor implements ControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};

  constructor(private host: AgeRestrictionItem) {

  }

  writeValue(value: any): void {
    console.log(`writeValue: ${JSON.stringify(value)}`);
    this.host.model = value;
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
