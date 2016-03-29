export class EventCategoryRegistrationType {
  type:string;
  description:string;
  cost:number;
  currencyCode:string;
  ageRestrictionMin: number;
  ageRestrictionMax: number;
  ageRestrictionAsOfDate :Date;
  registrationClosureDate:Date;
  capacity:number;
}
