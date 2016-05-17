describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'The Amazing Moss Starter Kit';
    expect(subject).toEqual(result);
  });

  it('should have <router-outlet>', () => {
    let subject = element(by.tagName('router-outlet')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

});
