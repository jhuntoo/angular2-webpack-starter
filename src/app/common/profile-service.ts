import {Injectable, provide} from 'angular2/core';
import {Config} from '../../config/config';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs';
import {AuthHttp} from '../../app/temp/angular2-jwt';
import {Logger, LoggingService} from './log';
import { deserializeAs, deserialize, Deserialize } from 'cerialize/dist/serialize';


export class Profile {
     @deserialize public firstName : string;
     @deserialize public lastName : string;

}

@Injectable()
export class ProfileService {

  public $loginStatusChanged:Subject<boolean> = new Subject<boolean>();
  public isLoggedIn:boolean = false;
  log:Logger;
  constructor(public authHttp: AuthHttp, private config:Config, loggingService: LoggingService) {

  }

  getProfile() : Observable<Profile> {
    return this.authHttp.get(`${this.config.apiBaseUrl}/me`)
      .timeout(10000, '/me timed out')
      .map((resp:Response) => { return this.toProfile(resp.json());});

  }

  private toProfile(body) : Profile {
    return Deserialize(body, Profile);
  }

}

export const PROFILE_PROVIDERS:any[] = [
  provide(ProfileService, {useClass: ProfileService})
];
