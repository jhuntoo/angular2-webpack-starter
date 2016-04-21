/*
 * TODO: ES5 for now until I make a webpack plugin for protractor
 */
import WebElement = protractor.WebElement;
import {browser, verifyNoBrowserErrors} from 'angular2/src/testing/e2e_util';

let createEventPage = {
  load() {
    return browser.get('/#/admin/events/create');
  },

  addCategoryButton() {
    return element(by.css('category-list > button')).getWebElement();
  },
};

var hasClass = function (element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
};



describe('Create an event', () => {

  describe('On page load', () => {
    beforeAll(() => {
      createEventPage.load();
    });

    afterEach(() => {
      verifyNoBrowserErrors();
    });

    it('should display add category button', () => {
      expect(createEventPage.addCategoryButton().isDisplayed()).toBe(true);
    });

  });

});
