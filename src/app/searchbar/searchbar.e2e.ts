//let tabletScreenWidth = 790;
//let phoneScreenWidth = 385;
//let eightyPercentOfTablet = `${tabletScreenWidth * 0.8}px`;
//let oneHundredPercentOfPhone= `${phoneScreenWidth}px`;
//
//// The browser size is different in CI, weird!
//if (process.env.CIRCLECI) {
//  eightyPercentOfTablet = `624px`;
//  oneHundredPercentOfPhone = `360px`;
//}
//
//
//let searchbarPage = {
//  load() {
//    return browser.get('/#/home');
//  },
//  formSearchBar() {
//    return element(by.id('form-search')).getWebElement();
//  },
//  formSearchBarWidth() {
//    return this.formSearchBar().getCssValue('width');
//  },
//  formSearchScreenType() {
//    return this.formSearchBar().getCssValue('data-screen-type');
//  },
//  setFullWidthScreen() {
//    return browser.manage().window().setSize(1920, 1080);
//  },
//  setTabletScreen() {
//    return browser.manage().window().setSize(tabletScreenWidth, 800);
//  },
//  setMobileScreen() {
//    return browser.manage().window().setSize(phoneScreenWidth, 520);
//  }
//};
//
//describe('Searchbar', () => {
//  describe("When in full-width mode", () => {
//    beforeAll((done) => {
//      searchbarPage.load();
//      searchbarPage.setFullWidthScreen().then(() => {
//        done();
//      });
//    });
//    describe('Screen Type', () => {
//      it('should be desktop', () => {
//        expect(searchbarPage.formSearchScreenType()).toBe("desktop");
//      });
//    });
//  });
//
//  describe("When in Tablet mode", () => {
//    beforeAll((done) => {
//      searchbarPage.load();
//      searchbarPage.setTabletScreen().then(() => {
//        done();
//      });
//    });
//    describe('Screen Type', () => {
//      it('should be tablet', () => {
//        expect(searchbarPage.formSearchScreenType()).toBe("tablet");
//      });
//    });
//  });
//
//
//  describe("When in Mobile mode", () => {
//    beforeAll((done) => {
//      searchbarPage.load();
//      searchbarPage.setMobileScreen().then(() => {
//        done();
//      });
//    });
//    describe('Screen Type', () => {
//      it('should be phone', () => {
//        expect(searchbarPage.formSearchScreenType()).toBe("phone");
//      });
//    });
//  });
//});
