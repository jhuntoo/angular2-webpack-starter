import {Component} from 'angular2/core';
import {AuthenticationService, LoggingService, Logger} from '../common/index';
import {Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {ProfileService} from '../common/profile-service';
import {Observable} from 'rxjs';
import {Profile} from '../common/profile-service';

@Component({

  selector: 'profile',
  styles: [require('./profile.less').toString()],
  template: require('./profile.html')
})

export class ProfilePage implements OnInit {

  log:Logger;

  profile: Profile;

  constructor(private auth: AuthenticationService,
              private router: Router,
              private profileService: ProfileService,
              loggingService: LoggingService
              ) {
    this.log = loggingService.getLogger('Profile');
  }

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.log.debug(`Is NOT logged in.`);
      this.router.navigate(['LoginForm']);
    } else {
      this.log.debug(`Is logged in.`);
      this.profileService.getProfile().subscribe(
        (p: Profile) => {
          this.profile = p;
          this.log.debug(`Profile: ${JSON.stringify(p)}`);
        },
            (err) => this.log.error(err),
            () => this.log.debug(`getProfile Complete`)

      );
    }
  }
}
