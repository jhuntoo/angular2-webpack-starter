import {Component, Input, HostBinding} from 'angular2/core';
import {ChangeDetectionStrategy} from 'angular2/core';


@Component({
  selector: 'card',
  changeDetection: ChangeDetectionStrategy.CheckOnce,
  //host: {
  //  'class': 'col-sm-4 fadeInLeft animated'
  //},
  styles: [ require('./card.less').toString() ],
  template: require('./card.html')
})
export class Card {

  @Input('title') public title : string;
  @Input('imgClass') public imgClass : string;

  @HostBinding('class') class = 'col-sm-4 fadeInLeft animated';


  constructor() {

  }



  ngOnInit() {
    console.log(`title=${this.title}`);
  }

}
