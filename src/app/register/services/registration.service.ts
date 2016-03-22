import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Config} from '../../../config/config';
import {Subject} from 'rxjs/Subject';
import {Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {EmailCheckResult} from '../models/EmailCheckResult';
import {RegisterResponse} from '../models/registerResponse';


@Injectable()
export class RegistrationService {
  public   emailCheckResult$:Subject<EmailCheckResult>;

  constructor(private http:Http, private config:Config) {
    console.log(`BaseUrl: ${config.apiBaseUrl}`);
  }

  public checkEmail(email:string):Observable<EmailCheckResult> {
    let request = {email: email };
    return this.http.post(`${this.config.apiBaseUrl}/auth/checkemail`, JSON.stringify(request))
      .timeout(10000, '/checkemail timed out')
      .map((response:Response):EmailCheckResult => {
        return this._toEmailCheckResult(response);
      });
  }

  public register(email :string, password :string):Observable<RegisterResponse> {
    let request = {email: email, password: password};
    return this.http.post(`${this.config.apiBaseUrl}/auth/register`, JSON.stringify(request))
      //.timeout(5000, '/register timed out')
      //.retry(3)
      .map((res:Response): RegisterResponse => {
        return this._toRegisterResponse(res);
      });
  }

  private _toRegisterResponse(response:Response):RegisterResponse {
    if (response.status !== 200) return RegisterResponse.error('http status is not 200');
    var body = response.json();
    if (body.success) {
      return RegisterResponse.success(body.token);
    } else if (body.exists) {
      return RegisterResponse.alreadyExists();
    }
    return RegisterResponse.error('response cannot be parsed');
  }

  private _toEmailCheckResult(response:Response):EmailCheckResult {
    if (response.status !== 200) return EmailCheckResult.error();
    if (response.json().available) {
      return EmailCheckResult.available();
    }
    return EmailCheckResult.taken();
  }
}

@Injectable()
export class MockRegistrationService {
  public emailCheckResult$:Subject<EmailCheckResult>;
  private mockEmailCheckResult:EmailCheckResult;

  static withMocked(mockEmailCheckResult:EmailCheckResult) {
    let service = new MockRegistrationService();
    service.mockEmailCheckResult = mockEmailCheckResult;
    return service;
  }

  public checkEmail(email:string):Observable<EmailCheckResult> {
    return Observable.of(this.mockEmailCheckResult);
  }
}
