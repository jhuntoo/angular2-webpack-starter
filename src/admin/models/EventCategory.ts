import {EventCategoryRegistrationType} from './EventCategoryRegistrationType';
import {Guid} from '../../common/guid';
export class EventCategory {
  get key() { return this._key;}
  sportId:number;
  distance:string = '';
  registrationClosureDate:Date;
  capacity:number;
  registrationTypes : EventCategoryRegistrationType[] = [];
  private _key: string = Guid.newGuid();

}
