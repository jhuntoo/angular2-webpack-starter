import {Injectable, provide, OnInit} from 'angular2/core';
import {Config} from '../../config/config';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import {AuthHttp} from '../../app/temp/angular2-jwt';
import {Logger, LoggingService} from './log';
import { deserializeAs, deserialize, Deserialize } from 'cerialize/dist/serialize';
import {AuthenticationService} from './authentication';

export class Profile {
  @deserialize public firstName:string;
  @deserialize public lastName:string;
  @deserialize public email:string;


}

@Injectable()
export class ProfileService {


  public profile:Subject<Profile> = new Subject<Profile>();
  log:Logger;

  constructor(public authHttp:AuthHttp,
              private config:Config,
              private loggingService:LoggingService,
              private authenticationService:AuthenticationService) {
    this.log = loggingService.getLogger('ProfileService');
    this.log.debug(`Loading...`);

    // Already logged in, load the profile
    if (this.authenticationService.isLoggedIn) {
      this.log.debug(`Already logged in, getting Profile`);
      this.loadProfile();
    }

    this.authenticationService.$loginStatusChanged.subscribe((loggedIn:boolean) => {
      this.log.debug(`Responding to loginStatusChange: ${loggedIn}`);
      if (loggedIn) {
        this.loadProfile();
      } else {
        this.profile.next(null);
      }
    },
    error => this.log.error(error));


  }

  loadProfile() {
    return this.authHttp.get(`${this.config.apiBaseUrl}/me`)
      .timeout(10000, '/me timed out')
      .map((resp:Response) => {
        return this.toProfile(resp.json());
      })
      .subscribe((p:Profile) => {
        this.log.debug('Profile Loaded');
        this.profile.next(p);
      },
      error => this.log.error(error));

  }


  private toProfile(body):Profile {
    return Deserialize(body, Profile);
  }

}

export const PROFILE_PROVIDERS:any[] = [
  provide(ProfileService, {useClass: ProfileService})
];
