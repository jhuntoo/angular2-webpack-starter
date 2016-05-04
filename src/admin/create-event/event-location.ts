import {Component, Directive, Input, forwardRef, Provider} from '@angular/core';
import {Location} from '../models/Location';
import {LoggingService, Logger} from '../../app/common/log';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from 'angular2-google-maps/core';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/components/accordion';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/common';
import {HostListener} from '@angular/core';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

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
  markers: Marker[] = [];

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

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}


//const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(
//  NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => EventLocationValueAccessor), multi: true}));
//
//@Directive({
//  selector: '[eventLocation]',
//  providers: [CUSTOM_VALUE_ACCESSOR]
//})
//export class EventLocationValueAccessor implements ControlValueAccessor {
//
//  @HostListener('valueChange')
//  onChange = (_) => {};
//  onTouched = () => {};
//
//  constructor(private host: EventLocation) {
//
//  }
//
//  writeValue(value: any): void {
//    console.log(`writeValue: ${JSON.stringify(value)}`);
//    this.host.location = value;
//  }
//
//  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
//  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
//}
