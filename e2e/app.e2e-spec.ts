import { NgNextPage } from './app.po';

describe('ng-next App', () => {
  let page: NgNextPage;

  beforeEach(() => {
    page = new NgNextPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
