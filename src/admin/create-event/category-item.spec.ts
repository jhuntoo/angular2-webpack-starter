import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  beforeEach,
  TestComponentBuilder,
  expect,
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';

// Load the implementations that should be tested
import {CategoryItem} from './category-item';
import {LoggingService,
  MockSeoService} from '../../app/common/index';
import {Config} from '../../config/config';
import {MockSportService, SportService} from '../../common/sport/sport-service';
import {Tab, Tabset} from '../../app/temp/tabs';
import {EventCategory} from './models/EventCategory';
import {ComponentFixture} from 'angular2/testing';

@Component({
  selector  : 'test-cmp',
  template  : '<category-item [model]="mockModel"></category-item>',
  directives: [ CategoryItem ]
})
class TestCmpWrapper {
  mockModel :EventCategory;

  constructor(ec: EventCategory) {
    this.mockModel =  ec;
  }
}

let sports = [
  {id: 99, name: 'Running', commonDistances: ['5KM', '10KM', 'Half Marathon', 'Marathon']},
  {id: 100, name: 'Running2', commonDistances: ['5KM', '10KM', 'Half Marathon']}
];
let mockSportService = new MockSportService();
mockSportService.sports = sports;

let ec = new EventCategory();
ec.distance = "15K"
ec.capacity = 100;
ec.registrationClosureDate = new Date(2020, 12, 31);
ec.sportId = 99;

describe('Event Category', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    CategoryItem,
    Tab,
    Tabset,
    EventCategory,
    TestComponentBuilder,
    provide(LoggingService, {useValue: new LoggingService()}),
    provide(Config, { useValue: {apiBaseUrl : '/test'} }),
  ]);

  describe('On load with existing NO values', () => {
    let element, categoryItemComponentInstance, options;
    let sportElement : HTMLElement;
    beforeEachProviders(() => [
      provide(EventCategory, {useValue: new EventCategory()}),
      provide(SportService, { useValue:  mockSportService}),
    ]);
    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TestCmpWrapper)
        .then((componentFixture: ComponentFixture) => {
        console.log('in promise');
          componentFixture.detectChanges()
        let cmpInstance: CategoryItem =
          <CategoryItem>componentFixture.debugElement.children[ 0 ].componentInstance;
        categoryItemComponentInstance = cmpInstance;
        element = componentFixture.nativeElement;
        sportElement = element.querySelector('#input-sport')
          options = sportElement.querySelectorAll('option');
      });
    }));

    //it('should render current sport as `Running`', () => {
    //
    //  expect(element.querySelector('#input-sport option:selected').value).toBe('Running');
    //});

    it('should render sports as options', () => {
          expect((<HTMLElement>options[0]).getAttribute('value')).toBe('99');
          expect((<HTMLElement>options[0]).innerHTML).toBe('Running');
          expect((<HTMLElement>options[1]).getAttribute('value')).toBe('100');
          expect((<HTMLElement>options[1]).innerHTML).toBe('Running2');

    });
    //
    it('should not display available distances', () => {
      expect(element.querySelectorAll('#input-distance option').length).toBe(0);
    });

    it('should render Registration closure date as empty string', () => {
      let date = element.querySelector('#input-registration-closure-date')
      expect(date.value).toBe('');

    });

    it('should render capacity as empty string', () => {
      let capacity = element.querySelector('#input-capacity')
      expect(capacity.value).toBe('');

    });

  });

  describe('On load with existing values', () => {
    let element, categoryItemComponentInstance, options;
    let sportElement : HTMLElement;
    beforeEachProviders(() => [
      provide(EventCategory, {useValue: ec}),
      provide(SportService, { useValue:  mockSportService}),
    ]);
    beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
      return tcb.createAsync(TestCmpWrapper)
        .then((componentFixture: ComponentFixture) => {
          console.log('in promise');
          componentFixture.detectChanges()
          let cmpInstance: CategoryItem =
            <CategoryItem>componentFixture.debugElement.children[ 0 ].componentInstance;
          categoryItemComponentInstance = cmpInstance;
          element = componentFixture.nativeElement;
          sportElement = element.querySelector('#input-sport')
          options = sportElement.querySelectorAll('option');
        });
    }));

    //it('should render current sport as `Running`', () => {
    //
    //  expect(element.querySelector('#input-sport option:selected').value).toBe('Running');
    //});

    it('should render sports as options', () => {
      expect((<HTMLElement>options[0]).getAttribute('value')).toBe('99');
      expect((<HTMLElement>options[0]).innerHTML).toBe('Running');
      expect((<HTMLElement>options[1]).getAttribute('value')).toBe('100');
      expect((<HTMLElement>options[1]).innerHTML).toBe('Running2');

    });

    it('should render available distances', () => {
      let distances = element.querySelectorAll('#input-distance option')
      expect(distances.length).toBe(4);
      expect((<HTMLElement>distances[0]).getAttribute('value')).toBe('5KM');
      expect((<HTMLElement>distances[0]).innerHTML).toBe('5KM');

      expect((<HTMLElement>distances[1]).getAttribute('value')).toBe('10KM');
      expect((<HTMLElement>distances[1]).innerHTML).toBe('10KM');
      expect((<HTMLElement>distances[2]).getAttribute('value')).toBe('Half Marathon');
      expect((<HTMLElement>distances[2]).innerHTML).toBe('Half Marathon');
      expect((<HTMLElement>distances[3]).getAttribute('value')).toBe('Marathon');
      expect((<HTMLElement>distances[3]).innerHTML).toBe('Marathon');

    });

    it('should render Registration closure date as `31/01/2021`', () => {
      let date = element.querySelector('#input-registration-closure-date')
      expect(date.value).toBe('31/01/2021');

    });

    it('should render capacity as `100`', () => {
      let capacity = element.querySelector('#input-capacity')
      expect(capacity.value).toBe('100');

    });

  });


});






