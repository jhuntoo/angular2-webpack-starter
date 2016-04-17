import {EventCategoryRegistrationType} from './EventCategoryRegistrationType';
import {Guid} from '../../../common/guid';
export class EventCategory {
  key: string = Guid.newGuid();
  sportId:number;
  distance:string = '';
  registrationClosureDate:Date;
  capacity:number;
  registrationTypes : EventCategoryRegistrationType[] = [];
}
