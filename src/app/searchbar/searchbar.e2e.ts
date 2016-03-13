let tabletScreenWidth = 790;
let phoneScreenWidth = 400;
let eightyPercentOfTablet = `${tabletScreenWidth * 0.8}px`;
let oneHundredPercentOfPhone= `${phoneScreenWidth}px`;

// The browser size is different in CI, weird!
if (process.env.CIRCLECI) {
  eightyPercentOfTablet = `624px`;
  oneHundredPercentOfPhone = `375px`;
}


let searchbarPage = {
  load() {
    return browser.get('/#/home');
  },
  formSearchBar() {
    return element(by.id('form-search')).getWebElement();
  },
  formSearchBarWidth() {
    return this.formSearchBar().getCssValue('width');
  },
  setFullWidthScreen() {
    browser.manage().window().setSize(1920, 1080);
  },
  setTabletScreen() {
    browser.manage().window().setSize(tabletScreenWidth, 800);
  },
  setMobileScreen() {
    browser.manage().window().setSize(phoneScreenWidth, 520);
  }
};

describe('Searchbar', () => {
  describe('When in full-width mode', () => {
    beforeAll(() => {
      searchbarPage.load();
      searchbarPage.setFullWidthScreen();
    });
    describe('Width', () => {
      it('should be fixed', () => {
        expect(searchbarPage.formSearchBarWidth()).toBe('785px');
      });
    });
  });

  describe('When in Tablet mode', () => {
    beforeAll(() => {
      searchbarPage.load();
      searchbarPage.setTabletScreen();
    });
    describe('Width', () => {
      it('should be 100%', () => {
        expect(searchbarPage.formSearchBarWidth()).toBe(eightyPercentOfTablet);
      });
    });
  });


  describe('When in Mobile mode', () => {
    beforeAll(() => {
      searchbarPage.load();
      searchbarPage.setMobileScreen();
    });
    describe('Width', () => {
      it('should be 100%', () => {
        expect(searchbarPage.formSearchBarWidth()).toBe(oneHundredPercentOfPhone);
      });
    });
  });
});
