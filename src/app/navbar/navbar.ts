import {Component, HostBinding, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {
  Collapse
} from 'ng2-bootstrap/components/collapse';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/components/dropdown';
import {AuthenticationService} from '../common/authentication';
import {OffClickDirective, LoggingService, Logger} from '../common/index';
import {Router} from 'angular2/router';
import {ProfileService, Profile} from '../common/profile-service';

@Component({

  selector: 'navbar',
  directives: [
    Collapse,
    DROPDOWN_DIRECTIVES,
    OffClickDirective,
  ],
  //host: {
  //  'class': 'navbar-component'
  //},
  styles: [

    require('./navbar.less').toString()],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./navbar.html')
})
export class Navbar implements OnInit {
  public isCollapsed:boolean = true;
  public loggedIn:boolean;
  public userMenuOpen:boolean;
  public email: string;
  log:Logger;

  @HostBinding('class') class = 'navbar-component';

  constructor(private authenticationService: AuthenticationService,
              loggingService: LoggingService,
              private router: Router,
              private profileService: ProfileService) {
      this.loggedIn = authenticationService.isLoggedIn;
      authenticationService.$loginStatusChanged.subscribe((isLoggedIn: boolean) => this.loggedIn = isLoggedIn);
      profileService.profile.subscribe((profile : Profile) => {
        if (profile) {
          this.email = profile.email;
        } else {
          this.email = null;
        };
      });
      this.clickedOutside = this.clickedOutside.bind(this);

  }

  onUserMenuClicked() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  clickedOutside() {
    this.userMenuOpen = false;
  }

  goToIndex() {
    this.userMenuOpen = false;
    this.router.navigate(['Index']);
  }

  goToProfile() {
    this.userMenuOpen = false;
    this.router.navigate(['Profile']);
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
    console.log('hello `navbar` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}
