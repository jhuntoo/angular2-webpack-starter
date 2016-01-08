 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('When the register pages loads', function() {

  beforeEach(function() {
    browser.get('/', 5000);
  });


  it('title should be Homely', function() {
    browser.sleep(2000);
    var subject = browser.getTitle();
    var result  = 'Homely';
    expect(subject).toEqual(result);
  });

  //it('should have <header>', function() {
  //  var subject = element(by.deepCss('app /deep/ header')).isPresent();
  //  var result  = true;
  //  expect(subject).toEqual(result);
  //});
  //
  //it('should have <main>', function() {
  //  var subject = element(by.deepCss('app /deep/ main')).isPresent();
  //  var result  = true;
  //  expect(subject).toEqual(result);
  //});
  //
  //it('should have <footer>', function() {
  //  var subject = element(by.deepCss('app /deep/ footer')).getText();
  //  var result  = 'WebPack Angular 2 Starter by @AngularClass';
  //  expect(subject).toEqual(result);
  //});

});
