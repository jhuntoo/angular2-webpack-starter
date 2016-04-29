import {EventCategory} from './EventCategory';
import {Location} from './Location';
import {Sponsorship} from './Sponsorship';
export class Event {

  constructor() {
    this.categories = [];
    this.location = new Location();
    this.sponsorship = new Sponsorship();
  }

  name:string;
  description:string;
  date:Date;
  location:Location;
  url:string;
  categories: EventCategory[];
  sponsorship: Sponsorship;
}
