import {Component} from 'angular2/core';
import {LoggingService} from '../common/log';
import {Http} from 'angular2/http';
import {Router} from 'angular2/router';
import {Logger} from '../common/log';
import {SearchService} from './services/search.service';
import {SearchResponse} from './models/searchResponse';
import {Event} from './models/event';


@Component({

  selector: 'search',
  styles: [require('./search.less').toString()],
  template: require('./search.html'),
  providers: [SearchService],
})
export class SearchPage {
  log:Logger;
  public events:Array<Event>;
  constructor(private _router: Router,private searchService:SearchService, logginService: LoggingService) {
    let log : Logger = logginService.getLogger('SearchPage');
    this.log = log;
  }




  ngOnInit() {
    this.log.debug('hello `SearchPage` component');
    this.searchService.search('')
      .subscribe(
        (response: SearchResponse) => this.applySearchResponse(response),
        err => this.applyError(err),
        () => this.log.debug('Search Complete')
      );

  }


  private applySearchResponse(response:SearchResponse) {
    this.log.debug(`apply: ${JSON.stringify(response)}`);
     if (!response.error) {
        this.events = response.events;
     }
  }

  private applyError(err) {
    this.log.error('/search endpoint unreachable');
    //this.isSubmitting = false;
    //this.isNetworkError = true;
  }
}
