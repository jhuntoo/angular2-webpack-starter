import {Component, HostBinding} from '@angular/core';
import {AuthenticationService, LoggingService, Logger} from '../common/index';
import {Router} from '@angular/router-deprecated';
import {OnInit} from '@angular/core';
import {ProfileService} from '../common/profile-service';
import {Observable} from 'rxjs';
import {Profile} from '../common/profile-service';

@Component({

  selector: 'profile',
  //host: {
  //  'class': 'h-full'
  //},
  styles: [require('./profile.less').toString()],
  template: require('./profile.html')
})

export class ProfilePage implements OnInit {

  log:Logger;

  profile: Profile;

  @HostBinding('class') class = 'h-full';

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
      this.profileService.profile.subscribe(
        (p: Profile) => {
          this.profile = p;
          this.log.debug(`Profile: ${JSON.stringify(p)}`);
        },
            (err) => this.log.error(err),
            () => this.log.debug(`getProfile Complete`)

      );
      this.profileService.loadProfile();
    }
  }
}
