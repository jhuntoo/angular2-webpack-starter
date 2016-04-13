var until = protractor.ExpectedConditions;
let loginErrorPage = {
  load() {
    return browser.get('/#/loginerror');
  },
  id () {
    return element(by.id('login-error-component'));
  }

};

describe('*** Login Error Page ***', () => {
  describe('On load when NOT logged in', () => {
    beforeAll(() => {
      loginErrorPage.load();
      return browser.wait(until.presenceOf(loginErrorPage.id()), 5000);
    });

    it(`should have page title of 'Login Error`, () => {
       expect(browser.getTitle()).toBe('Login Error');
    })
  });

});
