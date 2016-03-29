import {EventCategory} from './EventCategory';
import {Location} from './Location';
export class Event {

  constructor() {
    this.categories = [];
    this.location = new Location();
  }

  name:string;
  description:string;
  date:Date;
  location:Location;
  url:string;
  categories: EventCategory[];
}
