import {Component, Input, Inject, HostBinding, Host, OnInit, Output, EventEmitter} from 'angular2/core';
import {Control} from 'angular2/common';
import {EventCategory} from './models/EventCategory';
import {LoggingService, Logger} from '../../app/common/log';
import {Select} from 'ng2-select/ng2-select';
import {RegistrationTypeList} from './registration-type-list';
import {SportService} from '../../common/sport/sport-service';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Subject} from 'rxjs/Subject';
//import {Tab} from '../../app/temp/tabs';
import {Sport} from '../../common/sport/sport-service';
import {TAB_DIRECTIVES, Tab} from '../../app/temp/tabs';
//import {TAB_DIRECTIVES, Tab,} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'category-item',  // <home></home>
  directives: [Select, RegistrationTypeList, DROPDOWN_DIRECTIVES, TAB_DIRECTIVES],

  template: require('./category-item.html')
})
export class CategoryItem implements OnInit {


  @Input()  public model: EventCategory;
  //title: string;
  @Output() public $title : EventEmitter<string> = new EventEmitter<string>();
  currentSport: Sport;
  log:Logger;
  editing: boolean = false;
  index: number;
  isActive:boolean;


  //@HostBinding('class') class = 'list-group-item clearfix b-l-3x ng-scope';
  //@HostBinding('attr.style.border-left-color') borderLeftColor = '#23b7e5';

  sports: Sport[];

  constructor(logginService: LoggingService,
              private sportService :SportService) {
    this.log = logginService.getLogger('CategoryItem');
  }

  ngOnInit() {
    this.sports = this.sportService.getSports();
    if (!this.model) throw 'No associated model';
    if (this.model.sportId) { this.onSportChanged(this.model.sportId);}
    setTimeout(() => this.updateTitle(), 0);

    this.log.debug(`sports: ${JSON.stringify(this.sports)}`);
  }

  ngAfterViewInit() {
    this.updateTitle();
    this.log.debug(`ngAfterViewInit`);
  }

  onSportChanged(id: number) {
    /* tslint:disable */
    // use ==, not === or it break!
     this.currentSport = this.sports.find((s: Sport) => s.id == id);
    /* tslint:enable */
     if (!this.currentSport || this.currentSport.commonDistances.indexOf(this.model.distance) === -1) {
       this.log.error(`onSportChanged: could not find sport with id '${id}' in sports '${JSON.stringify(this.sports)}'`);
       this.model.distance = '';
     }

     this.updateTitle();
     console.log(`currentSport: ${JSON.stringify(this.currentSport )}`);
  }

  onDistanceChanged(distance : string) {
    this.model.distance = distance;
    this.updateTitle();
  }

  get capacity() {
     return this.model.capacity;
  }

  set capacity(capacity) {
    this.model.capacity = capacity;
  }

  get registrationClosureDate() {
     let d = this.model.registrationClosureDate;
      if (!d) return '';
      var yyyy = d.getFullYear().toString();
      var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = d.getDate().toString();

      //return yyyy + '-' + (mm[1]?mm:'0'+mm[0]) + '-' + (dd[1]?dd:'0'+dd[0]);
     return `${dd[1]?dd:'0'+dd[0]}/${mm[1]?mm:'0'+mm[0]}/${yyyy}`;
  }

  set registrationClosureDate(date : string) {
    this.model.registrationClosureDate = new Date(date);
  }

  get isValid() : boolean {
    let valid = (this.model.sportId && this.model.distance && this.model.registrationClosureDate && this.model.capacity) ? true : false;
    console.log(`valid: ${valid}`);
    return valid;
  }

  private updateTitle() {
    console.log(`udpateTitle`);
    let title = '';
    if (this.currentSport) {
      let distanceDescription = '';
      if (this.model.distance) { distanceDescription = ` (${this.model.distance})`;}
      console.log(`sport id: ${this.model.sportId} name: ${this.currentSport.name} distance: '${distanceDescription}'`);
      title = `${this.currentSport.name}${distanceDescription}`;
    } else {
      title =  'New Category';
    }
    this.$title.emit(title);

  }

}
