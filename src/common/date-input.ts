import {Component, Input, Output, EventEmitter,OnInit,Directive, HostListener, HostBinding} from '@angular/core';
import {NgFor, NgModel} from '@angular/common';
/* tslint:disable */
@Directive({
  selector: 'input[type=date]'
})
/* tslint:enable */

export class DateInputDirective {
  @HostBinding('value')
  _date: string;

  @Input() set date(d: Date) {
    this._date = this.toDateString(d);

  }
  @Output() dateChange: EventEmitter<Date>;
  constructor() {
    this.date = new Date();
    this.dateChange = new EventEmitter<Date>();
  }

  private toDateString(date: Date): string {
    console.log(`toDateString: ${JSON.stringify(date)}`);
    if (!date) return '';
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = date.getDate().toString();

        return yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]);
    //   let val = `${dd[1]?dd:'0'+dd[0]}/${mm[1]?mm:'0'+mm[0]}/${yyyy}`;
    //console.log(`toDateString: return= ${val}`);
    //return val;

  }
  private parseDateString(date:string): Date {
    var parts = date.split('-');

    return new Date(+parts[0], +parts[1] -1, +parts[2]); // Note: months are 0-based

  }

  @HostListener('change', ['$event.target.value'])
  private onDateChange(value: string): void {
    console.log(`onDateChange: ${JSON.stringify(value)}`);
    if (value && value !== this._date) {


      var parsedDate = this.parseDateString(value);

      // check if date is valid first
      if (parsedDate.getTime() !== NaN) {
        this._date = value;
        this.dateChange.emit(parsedDate);
      }
    }
  }
}
