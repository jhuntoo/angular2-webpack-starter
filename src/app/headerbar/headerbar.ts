import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {Collapse,
        DROPDOWN_DIRECTIVES,
        Ng2BootstrapConfig,
        Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap';
import {SessionManager} from '../services/sessionmanager';




@Component({
  selector: 'headerbar',
  template: require('./headerbar.html'),
  //styles: require('bootstrap/dist/css/bootstrap.css'),
  providers: [SessionManager],
  directives: [
    CORE_DIRECTIVES,
    Collapse,
    DROPDOWN_DIRECTIVES

  ]
})
export class HeaderBar {
  public isCollapsed: boolean = true;
  public prefix: string;

  constructor(private sessionManager : SessionManager) {
    console.log('HeaderBar constructor ' + sessionManager.loggedIn());

  }

  loggedIn() {
    return this.sessionManager.loggedIn();
  }

  login() {
    this.sessionManager.login();
  }

  logout() {
    this.sessionManager.logout();
  }


}
