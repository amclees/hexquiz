import { HexquizPage } from './app.po';

describe('hexquiz App', () => {
  let page: HexquizPage;

  beforeEach(() => {
    page = new HexquizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
