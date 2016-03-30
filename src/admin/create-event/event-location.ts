import {Component, Input} from 'angular2/core';
import {Location} from './models/Location';
import {LoggingService, Logger} from '../../app/common/log';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from 'angular2-google-maps/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/components/accordion';

@Component({
  selector: 'event-location',  // <home></home>
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ACCORDION_DIRECTIVES], // this loads all angular2-google-maps directives in this component
  // the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
  styles: [`
    .sebm-google-map-container {
      height: 300px;
    }
  `],
  template: require('./event-location.html')
})
export class EventLocation {

  @Input() location: Location;
  log:Logger;
  zoom: number = 5;
  markers: marker[] = [];

  defaultLat:number = 52.48278022207823;
  defaultLng:number = -1.40625;

  constructor(logginService: LoggingService) {
    this.log = logginService.getLogger('CategoryItem');
  }

  mapClicked($event: MouseEvent) {
    console.log(`map clicked: ${JSON.stringify({ lat: $event.coords.lat, lng: $event.coords.lng})}`);
    //this.markers = [ { lat: $event.coords.lat, lng: $event.coords.lng}];
    this.location.lat = $event.coords.lat;
    this.location.long = $event.coords.lng;
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
