let loginErrorPage = {
  load() {
    return browser.get('/#/loginerror');
  },

};

describe('*** Login Error Page ***', () => {
  describe('On load when NOT logged in', () => {
    beforeAll(() => {
      return loginErrorPage.load();
    });

    it(`should have page title of 'Login Error`, () => {
       expect(browser.getTitle()).toBe('Login Error');
    })
  });

});
