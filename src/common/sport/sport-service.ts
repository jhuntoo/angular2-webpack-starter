import {Injectable, provide} from '@angular/core';
import {LoggingService, Logger} from '../../app/common/log';


export class Sport {
  id:number;
  text:string;
  commonDistances: string[];
}

@Injectable()
export class SportService {

  getSports():Sport[] {
    return [
      {id: 1, text: 'Running', commonDistances: ['5KM', '10KM', 'Half Marathon', 'Marathon']},
      {id: 2, text: 'Obstacle', commonDistances: ['5KM']},
      {id: 3, text: 'Road Cycling', commonDistances: []},
      {id: 4, text: 'Mountain Biking', commonDistances: []},
      {id: 5, text: 'Swimming', commonDistances: []},
      {id: 6, text: 'Triathlon', commonDistances: ['']},
      {id: 7, text: 'Duathlon', commonDistances: ['']},
      {id: 8, text: 'Aquathlon', commonDistances: ['']},
      {id: 9, text: 'Adventure Race', commonDistances: ['']},
      {id: 10, text: 'Childrens', commonDistances: []},
      {id: 11, text: 'Multisport', commonDistances: ['']}
    ];
  }

}

@Injectable()
export class MockSportService {

  public sports: Sport[] = [
    {id: 1, text: 'Running', commonDistances: ['5KM', '10KM', 'Half Marathon', 'Marathon']},
    {id: 2, text: 'Obstacle', commonDistances: ['5KM']},
    {id: 3, text: 'Road Cycling', commonDistances: []},
    {id: 4, text: 'Mountain Biking', commonDistances: []},
    {id: 5, text: 'Swimming', commonDistances: []},
    {id: 6, text: 'Triathlon', commonDistances: ['']},
    {id: 7, text: 'Duathlon', commonDistances: ['']},
    {id: 8, text: 'Aquathlon', commonDistances: ['']},
    {id: 9, text: 'Adventure Race', commonDistances: ['']},
    {id: 10, text: 'Childrens', commonDistances: []},
    {id: 11, text: 'Multisport', commonDistances: ['']}
  ];

  getSports():Sport[] {
    return this.sports;
  }

}

export const SPORT_PROVIDERS:any[] = [ SportService ];
