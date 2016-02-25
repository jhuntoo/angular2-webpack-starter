/*
 * TODO: ES5 for now until I make a webpack plugin for protractor
 */
describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have the title `MustRace`', () => {
    let subject = browser.getTitle();
    let result = 'MustRace';
    expect(subject).toEqual(result);
  });

  it('should have <header>', () => {
    let subject = element(by.css('app header')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });

  it('should have a <navbar>', () => {
    let subject = element(by.tagName('navbar')).isPresent();
    expect(subject).toBeTruthy();
  });


  it('should have <main>', () => {
    let subject = element(by.css('app main')).isPresent();
    let result = true;
    expect(subject).toEqual(result);
  });


});
