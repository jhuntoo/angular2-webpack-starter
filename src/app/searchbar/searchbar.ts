import {Component} from 'angular2/core';
import {LoggingService} from '../common/log';
import {Http} from 'angular2/http';
import {Router} from 'angular2/router';
import {Logger} from '../common/log';


@Component({

  selector: 'searchbar',
  styles: [require('./searchbar.less').toString()],
  template: require('./searchbar.html')
})
export class SearchBar {
  log:Logger;


  constructor(private _router: Router,private http:Http, logginService: LoggingService) {
    let log : Logger = logginService.getLogger('RegisterForm');

    this.log = log;



  }

  search() {
    this._router.navigate(['Search']);
  }


  ngOnInit() {
    this.log.debug('hello `SearchBar` component');
    // this.title.getData().subscribe(data => this.data = data);
  }




}
