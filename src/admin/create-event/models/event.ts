import {EventCategory} from './EventCategory';
import {Location} from './Location';
export class Event {

  constructor() {
    this.categories = [];
  }

  name:string;
  description:string;
  date:Date;
  location:Location;
  url:string;
  categories: EventCategory[];
}
