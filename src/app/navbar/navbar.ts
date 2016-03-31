import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {
  Collapse
} from 'ng2-bootstrap/components/collapse';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import {AuthenticationService} from '../common/authentication';
import {OffClickDirective, LoggingService, Logger} from '../common/index';

@Component({

  selector: 'navbar',
  directives: [
    Collapse,
    DROPDOWN_DIRECTIVES,
    OffClickDirective,
  ],
  styles: [require('./navbar.less').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./navbar.html')
})
export class Navbar {
  public isCollapsed:boolean = true;
  public loggedIn:boolean;
  public userMenuOpen:boolean;
  log:Logger;
  constructor(private authenticationService: AuthenticationService, loggingService: LoggingService) {
      this.loggedIn = authenticationService.isLoggedIn;
      authenticationService.$loginStatusChanged.subscribe((isLoggedIn: boolean) => this.loggedIn = isLoggedIn);
      this.clickedOutside = this.clickedOutside.bind(this);

  }

  onUserMenuClicked() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  clickedOutside() {
    this.userMenuOpen = false;
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
    console.log('hello `navbar` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
