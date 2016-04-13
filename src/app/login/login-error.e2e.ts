import {browser, verifyNoBrowserErrors} from 'angular2/src/testing/e2e_util';
var until = protractor.ExpectedConditions;
let loginErrorPage = {
  load() {
    return browser.get('/#/loginerror');
  }
};

describe('*** Login Error Page ***', () => {
  describe('On load when NOT logged in', () => {
    beforeAll(() => {
      loginErrorPage.load();
      browser.wait(protractor.until.elementLocated(by.id('login-error-component')), 5000);
    });

    afterEach(() => {
      verifyNoBrowserErrors();
    });

    it(`should have page title of 'Login Error`, () => {
       expect(browser.getTitle()).toBe('Login Error');
    })
  });

});
