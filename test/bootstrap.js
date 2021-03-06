const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

const opts = {
  headless: true,
  timeout: 10000
};

before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(opts);
});

after (function () {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});
