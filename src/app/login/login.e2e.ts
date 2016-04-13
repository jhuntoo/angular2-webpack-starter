import {browser, verifyNoBrowserErrors} from 'angular2/src/testing/e2e_util';
var until = protractor.ExpectedConditions;
let loginPage = {
  load() {
    return browser.get('/#/login');
  },
  id () {
    return element(by.id('login-component'));
  }

};

describe('*** Login Page ***', () => {
  describe('On load when NOT logged in', () => {
    beforeAll(() => {
      loginPage.load();
      return browser.wait(until.presenceOf(loginPage.id()), 5000);
    });

    afterEach(() => {
      verifyNoBrowserErrors();
    });

    it(`should have page title of 'Login on MustRace`, () => {
       expect(browser.getTitle()).toBe('Login on MustRace');
    })
  });

});
