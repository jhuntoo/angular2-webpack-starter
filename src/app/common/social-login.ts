import {Injectable} from '@angular/core';
import {Config} from '../../config/config';

export class Provider {
  constructor(
    public name: string,
    public authUrl: string
  ) {}
}


@Injectable()
export class SocialLogin {
  public twitter:Provider;
  public facebook:Provider;
  public google:Provider;
  constructor(config:Config) {
    this.twitter = new Provider('twitter', config.apiBaseUrl + '/auth/twitter');
    this.facebook = new Provider('facebook', config.apiBaseUrl + '/auth/facebook');
    this.google = new Provider('google', config.apiBaseUrl + '/auth/google');
  }
}
