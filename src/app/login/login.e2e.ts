let loginPage = {
  load() {
    return browser.get('/#/login');
  },

};

describe('*** Login Page ***', () => {
  describe('On load when NOT logged in', () => {
    beforeAll(() => {
      return loginPage.load();
    });

    it(`should have page title of 'Login on MustRace`, () => {
       expect(browser.getTitle()).toBe('Login on MustRace');
    })
  });

});
