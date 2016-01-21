import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Http} from 'angular2/http';
import {AppConfig} from '../../config/config';
declare var Auth0Lock;
import {Injectable} from 'angular2/core';

@Injectable()
export class SessionManager {
  lock : any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: Http, public authHttp: AuthHttp, private appConfig : AppConfig) {
     this.lock = new Auth0Lock(appConfig.auth0.client_id, appConfig.auth0.domain);
  }

  login() {

    this.lock.show((err: string, profile: string, id_token: string) => {

      if (err) {
        console.log('Error: ' + err);
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getThing() {
    this.http.get('http://localhost:3001/ping')
      .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  getSecretThing() {
    this.authHttp.get('http://localhost:3001/secured/ping')
      .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
      );
  }

  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
    );
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }
}
