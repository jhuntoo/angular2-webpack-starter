import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Config} from '../../../config/config';
import {Subject} from 'rxjs/Subject';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {SearchResponse} from '../models/searchResponse';
import {Event} from '../models/event';


@Injectable()
export class SearchService {

  constructor(private http:Http, private config:Config) {
    console.log(`BaseUrl: ${config.apiBaseUrl}`);
  }

  public search(term :string):Observable<SearchResponse> {
    return this.http.get(`${this.config.apiBaseUrl}/events`)
      .timeout(10000, '/events timed out')
      .map((response:Response):SearchResponse => {
        return this._toSearchResponse(response);
      });
  }

  private _toSearchResponse(response:Response):SearchResponse {
    if (response.status !== 200) return SearchResponse.error();
    let body = response.json();
    return SearchResponse.with(body.data);
  }
}
//
//@Injectable()
//export class MockRegistrationService {
//  public emailCheckResult$:Subject<EmailCheckResult>;
//  private mockEmailCheckResult:EmailCheckResult;
//
//  static withMocked(mockEmailCheckResult:EmailCheckResult) {
//    let service = new MockRegistrationService();
//    service.mockEmailCheckResult = mockEmailCheckResult;
//    return service;
//  }
//
//  public checkEmail(email:string):Observable<EmailCheckResult> {
//    return Observable.of(this.mockEmailCheckResult);
//  }
//}
