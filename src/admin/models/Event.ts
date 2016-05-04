import {EventCategory} from './EventCategory';
import {Location} from './Location';
import {Sponsorship} from './Sponsorship';
export class Event {

  name:string;
  description:string;
  date:Date;
  location:Location;
  url:string;
  categories: EventCategory[];
  sponsorship: Sponsorship;
  constructor() {
    this.categories = [];
    this.location = new Location();
    this.sponsorship = new Sponsorship();
  }


}
