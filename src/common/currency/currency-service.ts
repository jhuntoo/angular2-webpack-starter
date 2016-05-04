import {Injectable, provide} from '@angular/core';
import {LoggingService, Logger} from '../../app/common/log';


export class Currency {
  id:string;
  text:string;
}

@Injectable()
export class CurrencyService {

  getCurrencies():Currency[] {
    return [ {id: 'GBP', text: 'GBP'} ];
  }
}



export const CURRENCY_PROVIDERS:any[] = [ CurrencyService ];
