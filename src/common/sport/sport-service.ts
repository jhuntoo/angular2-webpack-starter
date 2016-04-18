import {Injectable, provide} from 'angular2/core';
import {LoggingService, Logger} from '../../app/common/log';


export class Sport {
  id:number;
  name:string;
  commonDistances: string[];
}

@Injectable()
export class SportService {

  getSports():Sport[] {
    return [
      {id: 1, name: 'Running', commonDistances: ['5KM', '10KM', 'Half Marathon', 'Marathon']},
      {id: 2, name: 'Obstacle', commonDistances: ['5KM']},
      {id: 3, name: 'Road Cycling', commonDistances: []},
      {id: 4, name: 'Mountain Biking', commonDistances: []},
      {id: 5, name: 'Swimming', commonDistances: []},
      {id: 6, name: 'Triathlon', commonDistances: ['']},
      {id: 7, name: 'Duathlon', commonDistances: ['']},
      {id: 8, name: 'Aquathlon', commonDistances: ['']},
      {id: 9, name: 'Adventure Race', commonDistances: ['']},
      {id: 10, name: 'Childrens', commonDistances: []},
      {id: 11, name: 'Multisport', commonDistances: ['']}
    ];
  }

}

@Injectable()
export class MockSportService {

  public sports: Sport[] = [
    {id: 1, name: 'Running', commonDistances: ['5KM', '10KM', 'Half Marathon', 'Marathon']},
    {id: 2, name: 'Obstacle', commonDistances: ['5KM']},
    {id: 3, name: 'Road Cycling', commonDistances: []},
    {id: 4, name: 'Mountain Biking', commonDistances: []},
    {id: 5, name: 'Swimming', commonDistances: []},
    {id: 6, name: 'Triathlon', commonDistances: ['']},
    {id: 7, name: 'Duathlon', commonDistances: ['']},
    {id: 8, name: 'Aquathlon', commonDistances: ['']},
    {id: 9, name: 'Adventure Race', commonDistances: ['']},
    {id: 10, name: 'Childrens', commonDistances: []},
    {id: 11, name: 'Multisport', commonDistances: ['']}
  ];

  getSports():Sport[] {
    return this.sports;
  }

}

export const SPORT_PROVIDERS:any[] = [ SportService ];
