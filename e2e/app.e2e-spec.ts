import { GriffinPage } from './app.po';

describe('griffin App', () => {
  let page: GriffinPage;

  beforeEach(() => {
    page = new GriffinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
