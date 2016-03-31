/*
 * TODO: ES5 for now until I make a webpack plugin for protractor
 */
import WebElement = protractor.WebElement;

let page = {
  load() {
    return browser.get('/#/home');
  },
  header() {
    return element(by.id('header')).getWebElement();
  },
  headerPaddingTop() {
    return this.header().getCssValue('padding-top');
  },
  headerPaddingBottom() {
    return this.header().getCssValue('padding-bottom');
  },
  collapseToggle() {
    return element(by.id('button-toggle-collapse')).getWebElement();
  },
  clickCollapseToggle() {
    return element(by.id('button-toggle-collapse')).getWebElement().click();
  },
  collapseMenu() {
    return element(by.id('menu-collapse')).getWebElement();
  },
  collapseMenuIsExapanded() {
    return this.collapseMenu().getAttribute('aria-expanded').then(attr => {
      return attr === 'true';
    });
  },
  siteLink() {
    return element(by.id('link-site')).getWebElement();
  },
  emailLink() {
    return element(by.id('link-email')).getWebElement();
  },
  twitterLink() {
    return element(by.id('link-twitter')).getWebElement();
  },
  facebookLink() {
    return element(by.id('link-facebook')).getWebElement();
  },
  registerButtonFull() {
    return element(by.id('button-register-full')).getWebElement();
  },
  registerButtonMobile() {
    return element(by.id('button-register-mobile')).getWebElement();
  },
  setFullWidthScreen() {
    browser.manage().window().setSize(1080, 1920);
  },
  setMobileScreen() {
    browser.manage().window().setSize(320, 480);
  }
};

var hasClass = function (element, cls) {
  return element.getAttribute('class').then(function (classes) {
    return classes.split(' ').indexOf(cls) !== -1;
  });
};



describe('App', () => {



  describe('When in full-width mode', () => {
    beforeAll(() => {
      page.load();
      page.setFullWidthScreen();
    });
    describe('Header', () => {
      it('should have large vertical padding', () => {
        expect(page.headerPaddingBottom()).toBe('15px');
        expect(page.headerPaddingTop()).toBe('15px');
      });
    });

    describe('Register button full-size', () => {
      it('should be displayed', () => {
        expect(page.registerButtonFull().isDisplayed()).toBe(true);
      });
    });
    describe('Register button mobile-size', () => {
      it('should not be displayed', () => {
        expect(page.registerButtonMobile().isDisplayed()).toBe(false);
      });
    });
    describe('Collapse button', () => {
      it('should not be displayed', () => {
        expect(page.collapseToggle().isDisplayed()).toBe(false);
      });
    });
    describe('Collapse Menu', () => {
      it('should not be expanded', () => {
        expect(page.collapseMenuIsExapanded()).toBe(false);
      });
    });

    describe('`MustRace` site link', () => {
      it('should be displayed', () => {
        expect(page.siteLink().isDisplayed()).toBe(true);
      });
      it('should have text `MUST RACE`', () => {
        expect(page.siteLink().getText()).toBe('MustRace');
      });
      it('should reference the root URL', () => {
        expect(page.siteLink().getAttribute('href')).toBe('http://localhost:8080/');
      });
    });



  });

  describe('When in Mobile mode', () => {


    describe('On Load', () => {
      beforeAll(() => {
        page.load();
        page.setMobileScreen();
      });
      describe('Header', () => {
        it('should have small vertical padding', () => {
          expect(page.headerPaddingBottom()).toBe('5px');
          expect(page.headerPaddingTop()).toBe('5px');
        });
      });
      describe('Register button full-size', () => {
        it('should NOT be displayed', () => {
          expect(page.registerButtonFull().isDisplayed()).toBe(false);
        });
      });
      describe('Register button mobile-size', () => {
        it('should be displayed', () => {
          expect(page.registerButtonMobile().isDisplayed()).toBe(true);
        });
      });
      describe('Collapse button', () => {
        it('should be displayed', () => {
          expect(page.collapseToggle().isDisplayed()).toBe(true);
        });
      });
      describe('Collapse Menu', () => {
        it('should not be expanded', () => {
          expect(page.collapseMenuIsExapanded()).toBe(false);
        });
      });
    });

    describe('After toggle button clicked', () => {
      beforeAll(() => {
        page.clickCollapseToggle();
      });
      describe('Register button full-size', () => {
        it('should NOT be displayed', () => {
          expect(page.registerButtonFull().isDisplayed()).toBe(false);
        });
      });
      describe('Register button mobile-size', () => {
        it('should be displayed', () => {
          expect(page.registerButtonMobile().isDisplayed()).toBe(true);
        });
      });
      describe('Collapse button', () => {
        it('should be displayed', () => {
          expect(page.collapseToggle().isDisplayed()).toBe(true);
        });
      });
      describe('Collapse Menu', () => {
        it('should be expanded', () => {
          expect(page.collapseMenuIsExapanded()).toBe(true);
        });
        it('should be not expanded after clicking it again', () => {
          page.clickCollapseToggle().then(() => {
            expect(page.collapseMenuIsExapanded()).toBe(false);

          });
        });
      });
    });

  });

});
