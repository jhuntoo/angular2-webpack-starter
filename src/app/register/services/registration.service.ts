import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Config} from "../../../config/config";
import {Subject} from "rxjs/Subject";
import {Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {EmailCheckResult} from "./../models/emailCheckResult";


@Injectable()
export class RegistrationService {
  public   emailCheckResult$:Subject<EmailCheckResult>;

  constructor(private http:Http, private config:Config) {
  }

  public checkEmail(email:string):Observable<EmailCheckResult> {
    return this.http.get(`${this.config.apiBaseUrl}/checkemail`)
      .map((response:Response):EmailCheckResult => {
        return this._toEmailCheckResult(response)
      });
  }

  private _toEmailCheckResult(response:Response):EmailCheckResult {
    if (response.status != 200) return EmailCheckResult.error();
    if (response.json().available) return EmailCheckResult.available();
    else return EmailCheckResult.taken();
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
