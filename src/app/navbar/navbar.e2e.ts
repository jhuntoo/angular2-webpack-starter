 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
import WebElement = protractor.WebElement;

 describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });

  describe('`MUST RACE` site link', () => {
    let siteLinkElement : WebElement;
    beforeEach(() => {
      siteLinkElement = element(by.id('siteLink')).getWebElement();
    });
    it('should be displayed', () => {
      expect(siteLinkElement.isDisplayed()).toBe(true);
    });
    it('should have text `MUST RACE`', () => {
      expect(siteLinkElement.getText()).toBe('MUST RACE');
    });
    it('should reference the root URL', () => {
      expect(siteLinkElement.getAttribute('href')).toBe('http://localhost:8080/');
    });
  });

   describe('Email link', () => {
     let emailLinkElement : WebElement;
     beforeEach(() => {
       emailLinkElement = element(by.id('emailLink')).getWebElement();
     });
     it('should be displayed', () => {
       expect(emailLinkElement.isDisplayed()).toBe(true);
     });
     it('should link to contain the correct mailto link', () => {
       expect(emailLinkElement.getAttribute('href')).toBe('mailto:contact@mustrace.com?Subject=Hello%20again');
     });
     it('should contain the font awesome envelope icon', () => {
       expect(emailLinkElement.findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-envelope fa-2x');
     });
   });

   describe('Twitter link', () => {
     let twitterLinkElement : WebElement;
     beforeEach(() => {
       twitterLinkElement = element(by.id('twitterLink')).getWebElement();
     });
     it('should be displayed', () => {
       expect(twitterLinkElement.isDisplayed()).toBe(true);
     });
     it('should link to contain the correct twitter link', () => {
       expect(twitterLinkElement.getAttribute('href')).toBe('https://twitter.com/Must_Race_Com');
     });
     it('should contain the font awesome twitter icon', () => {
       expect(twitterLinkElement.findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-twitter fa-2x');
     });
   });

   describe('Facebook link', () => {
     let facebookLinkElement : WebElement;
     beforeEach(() => {
       facebookLinkElement = element(by.id('facebookLink')).getWebElement();
     });
     it('should be displayed', () => {
       expect(facebookLinkElement.isDisplayed()).toBe(true);
     });
     it('should link to contain the correct twitter link', () => {
       expect(facebookLinkElement.getAttribute('href')).toBe('https://www.facebook.com/mustracecom/?fref=ts');
     });
     it('should contain the font awesome facebook-official icon', () => {
       expect(facebookLinkElement.findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-facebook-official fa-2x');
     });
   });

});
