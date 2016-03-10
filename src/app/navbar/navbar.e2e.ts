/*
 * TODO: ES5 for now until I make a webpack plugin for protractor
 */
import WebElement = protractor.WebElement;

let page = {
  load: function () {
    return browser.get('/#/home');
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
      return attr === "true";
    })
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



  describe("When in full-width mode", () => {
    beforeAll(() => {
      page.load();
      page.setFullWidthScreen();
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

    describe('Email link', () => {
      it('should be displayed', () => {
        expect(page.emailLink().isDisplayed()).toBe(true);
      });
      it('should link to contain the correct mailto link', () => {
        expect(page.emailLink().getAttribute('href')).toBe('mailto:contact@mustrace.com?Subject=Hello%20again');
      });
      it('should contain the font awesome envelope icon', () => {
        expect(page.emailLink().findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-envelope');
      });
    });

    describe('Twitter link', () => {
     it('should be displayed', () => {
        expect(page.twitterLink().isDisplayed()).toBe(true);
      });
      it('should link to contain the correct twitter link', () => {
        expect(page.twitterLink().getAttribute('href')).toBe('https://twitter.com/Must_Race_Com');
      });
      it('should contain the font awesome twitter icon', () => {
        expect(page.twitterLink().findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-twitter');
      });
    });

    describe('Facebook link', () => {
      it('should be displayed', () => {
        expect(page.facebookLink().isDisplayed()).toBe(true);
      });
      it('should link to contain the correct twitter link', () => {
        expect(page.facebookLink().getAttribute('href')).toBe('https://www.facebook.com/mustracecom/?fref=ts');
      });
      it('should contain the font awesome facebook-official icon', () => {
        expect(page.facebookLink().findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-facebook-official');
      });
    });
  });

  describe("When in Mobile mode", () => {


    describe('On Load', () => {
      beforeAll(() => {
        page.load();
        page.setMobileScreen();
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
