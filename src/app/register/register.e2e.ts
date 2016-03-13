/*
 * TODO: ES5 for now until I make a webpack plugin for protractor
 */
//import WebElement = protractor.WebElement;
import textToBePresentInElementValue = protractor.ExpectedConditions.textToBePresentInElementValue;
import {error} from 'util';
function sleepFor(sleepDuration ) {
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration) { /* do nothing */ }
}

let registerPage = {
  load: function () {
    return browser.get('/#/register');
  },

  emailInput () {
    return element(by.id('input-email'));
  },
  emailErrors () {
    return element(by.id('errors-email')).all(by.tagName('span'));
  },
  passwordInput () {
    return element(by.id('input-password')).getWebElement();
  },
  passwordErrors() {
    return element(by.id('errors-password')).all(by.tagName('span'));
  },
  confirmPasswordInput () {
    return element(by.id('input-confirm-password')).getWebElement();
  },
  confirmPasswordErrors () {
    return element(by.id('errors-confirm-password')).all(by.tagName('span'));
  },
  matchingPasswordErrors () {
    return element(by.id('errors-matching-password')).all(by.tagName('span'));
  },
  submitButton: function () {
    return element(by.id('button-submit')).getWebElement();
  },

  completeForm(email, password, confirmpassword) {
    let page = this;
    page.load().then(() => {
      page.emailInput().sendKeys('joe@example.com');
    }).then(() => {
      page.passwordInput().sendKeys('Password123$');
    }).then(() => {
      page.confirmPasswordInput().sendKeys('Password123$');
    });

  },


  expectErrorAfterLeavingInput(input, errorElements, expectError) {
    return input.sendKeys(protractor.Key.TAB).then(() => {
      var errors = errorElements.filter((errorElement) => {
        return  errorElement.getText().then((label) => {
          return label === expectError;
        });
      });

      expect(errors.count()).toBe(1);

    });
  }
};


describe('Register', () => {



  describe('On Page Load', () => {
    beforeAll(() => {
      registerPage.load();
    });
    it('should display email input', () => {
      expect(registerPage.emailInput().isDisplayed()).toBeTruthy();
    });
    it('should display password input', () => {
      expect(registerPage.passwordInput().isDisplayed()).toBeTruthy();
    });
    it('should display confirm password input', () => {
      expect(registerPage.confirmPasswordInput().isDisplayed()).toBeTruthy();
    });
    it('should display submit button disabled', () => {
      expect(registerPage.submitButton().isDisplayed()).toBeTruthy();
      expect(registerPage.submitButton().getAttribute('disabled')).not.toBeNull();
    });
    it('should not display passwords errors', () => {
      expect(registerPage.passwordErrors().count()).toBe(0);
    });
    it('should not display email errors', () => {
      expect(registerPage.emailErrors().count()).toBe(0);
    });
    it('should not display confirm password errors', () => {
      expect(registerPage.emailErrors().count()).toBe(0);
    });
    it('should not display matching password errors', () => {
      expect(registerPage.matchingPasswordErrors().count()).toBe(0);
    });
  });

  describe('On leaving fields empty', () => {
    beforeAll(() => {
      registerPage.load();
    });
    it('should display email required', () => {
        registerPage.expectErrorAfterLeavingInput(registerPage.emailInput(), registerPage.emailErrors(), 'Required');
    });
    it('should display password required', () => {
      registerPage.expectErrorAfterLeavingInput(registerPage.passwordInput(), registerPage.passwordErrors(), 'Required');
    });
    it('should display confirm password required', () => {
      registerPage.expectErrorAfterLeavingInput(registerPage.confirmPasswordInput(), registerPage.confirmPasswordErrors(), 'Required');
    });

  });

  describe('On filling out all fields correctly', () => {
    beforeAll(() => {
      return registerPage.completeForm('joe@example.com', 'Password123$', 'Password123$');
    });
    it('should display submit button enabled', () => {
      expect(registerPage.submitButton().isDisplayed()).toBeTruthy();
      expect(registerPage.submitButton().getAttribute('disabled')).toBeNull();
    });
    it('should not display passwords errors', () => {
      expect(registerPage.passwordErrors().count()).toBe(0);
    });
    it('should not display email errors', () => {
      expect(registerPage.emailErrors().count()).toBe(0);
    });
    it('should not display confirm password errors', () => {
      expect(registerPage.emailErrors().count()).toBe(0);
    });
    it('should not display matching password errors', () => {
      expect(registerPage.matchingPasswordErrors().count()).toBe(0);
    });

  });


  //describe('Email link', () => {
  //  let emailLinkElement:WebElement;
  //  beforeEach(() => {
  //    emailLinkElement = element(by.id('emailLink')).getWebElement();
  //  });
  //  it('should be displayed', () => {
  //    expect(emailLinkElement.isDisplayed()).toBe(true);
  //  });
  //  it('should link to contain the correct mailto link', () => {
  //    expect(emailLinkElement.getAttribute('href')).toBe('mailto:contact@mustrace.com?Subject=Hello%20again');
  //  });
  //  it('should contain the font awesome envelope icon', () => {
  //    expect(emailLinkElement.findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-envelope fa-3x');
  //  });
  //});
  //
  //describe('Twitter link', () => {
  //  let twitterLinkElement:WebElement;
  //  beforeEach(() => {
  //    twitterLinkElement = element(by.id('twitterLink')).getWebElement();
  //  });
  //  it('should be displayed', () => {
  //    expect(twitterLinkElement.isDisplayed()).toBe(true);
  //  });
  //  it('should link to contain the correct twitter link', () => {
  //    expect(twitterLinkElement.getAttribute('href')).toBe('https://twitter.com/Must_Race_Com');
  //  });
  //  it('should contain the font awesome twitter icon', () => {
  //    expect(twitterLinkElement.findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-twitter fa-3x');
  //  });
  //});
  //
  //describe('Facebook link', () => {
  //  let facebookLinkElement:WebElement;
  //  beforeEach(() => {
  //    facebookLinkElement = element(by.id('facebookLink')).getWebElement();
  //  });
  //  it('should be displayed', () => {
  //    expect(facebookLinkElement.isDisplayed()).toBe(true);
  //  });
  //  it('should link to contain the correct twitter link', () => {
  //    expect(facebookLinkElement.getAttribute('href')).toBe('https://www.facebook.com/mustracecom/?fref=ts');
  //  });
  //  it('should contain the font awesome facebook-official icon', () => {
  //    expect(facebookLinkElement.findElement(by.tagName('i')).getAttribute('class')).toBe('fa fa-facebook-official fa-3x');
  //  });
  //});

});
