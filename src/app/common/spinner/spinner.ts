'use strict';

import {Component, Input, OnDestroy} from 'angular2/core';

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

    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimeout();
    }, this.delay);
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }

  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }


}
