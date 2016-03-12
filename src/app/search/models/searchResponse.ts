import {Event} from './event';
export class SearchResponse {
  constructor(public events:Array<Event>,
              public error:boolean) {
  }

  static error():SearchResponse {
    return new SearchResponse([], true);
  }

  static with(events :Array<Event>):SearchResponse {
    return new SearchResponse(events, false);
  }

}
