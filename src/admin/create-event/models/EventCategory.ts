import {EventCategoryRegistrationType} from './EventCategoryRegistrationType';
export class EventCategory {

  sportId:number;
  distance:string = '';
  registrationClosureDate:Date;
  capacity:number;
  registrationTypes : EventCategoryRegistrationType[] = [];
}
