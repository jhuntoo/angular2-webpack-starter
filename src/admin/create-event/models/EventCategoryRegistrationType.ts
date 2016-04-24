import {AgeRestriction} from './AgeRestriction';
export class EventCategoryRegistrationType {

  type:string;
  description:string;
  cost:number;
  currencyCode:string;
  ageRestriction: AgeRestriction = new AgeRestriction();
  registrationClosureDate:Date;
  capacity:number;

}
