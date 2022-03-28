
describe('Open source CMS test', function () {
  
  const username = 'opensourcecms';
  const password = 'opensourcecms';

  //import functions & constants & selectors

  before(async function () {
      page = await browser.newPage();
      await page.goto('https://s1.demo.opensourcecms.com/cms_madesimple/admin/login.php');
  });
  
  after(async function () {
      await page.close();
  })
  
  it('should have the correct page title', async function () {
    expect(await page.title()).to.eql('Login to CMS Made Simple™ - CMS Made Simple');
  });

  it('should see Dashboard after login', async function () {
    await page.type("#lbusername", username);
    await page.type("#lbpassword", password);
    await page.click("#wrapper > div > div > form > fieldset > input:nth-child(5)");
    await page.waitForSelector('.content');
    let content
    content = await page.$eval('.content', content => content.innerText);
    expect(content).to.eql('Content');
  });

  it('should go to Content Manager', async function () {
    await page.click('#topcontent_wrap > div:nth-child(2) > nav > ul > li:nth-child(1) > a');
    expect(await page.title()).to.contain('Content\u00a0Manager - CMS Made Simple');
  });
  
  it('should be able to add New Content', async function () {
    await page.waitForSelector('.grid_8 [accesskey="n"]');
    await page.click('.grid_8 [accesskey="n"]');     
    await page.waitForSelector("#in_title");
    await page.type("#in_title", "Outdoorsy test");
    await page.waitForSelector('button[value="Submit"]');
    await page.click('button[value="Submit"]');
    await page.waitForSelector('.message.pagemcontainer');
    let contentUpdatedMsg
    contentUpdatedMsg = await page.$eval('.message.pagemcontainer', contentUpdatedMsg => contentUpdatedMsg.innerText);
    expect(contentUpdatedMsg).to.eql('Content Updated');
  });
});
