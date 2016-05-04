// <reference path="node_modules/typescript/lib/lib.d.ts" />
import {Component, Input, OnDestroy} from '@angular/core';

@Component({
  selector: 'spinner',
  template: require('./spinner.html'),
  styles :[require('./spinner.css').toString()]
})
export class SpinnerComponent implements OnDestroy {
  @Input()
  public delay: number = 300;

  private currentTimeout: number;
  private isDelayedRunning: boolean = false;



  @Input()
  public set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
      return;
    }

    if (this.currentTimeout) {
      return;
    }

    //this.currentTimeout = window.setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimeout();
    //}, this.delay);
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }

  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }


}
