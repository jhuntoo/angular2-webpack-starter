import {AgeRestriction} from './AgeRestriction';
export class EventCategoryRegistrationType {
  type:string;
  description:string;
  cost:number;
  currencyCode:string;
  ageRestriction: AgeRestriction;
  registrationClosureDate:Date;
  capacity:number;
}
