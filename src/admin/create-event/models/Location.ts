export class Location {
  location:string;
  lat:number;
  long:number;
  get hasCoordinates() {
    return (this.lat && this.long);
  }
}
