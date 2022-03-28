/// <reference types="cypress" />
import { randomContentTypeText, contentPageTitle } from '../../data/outdoorsy_constants';
import { CONTENT, COUNTER } from '../../data/outdoorsy_selectors';

describe('Open source CMS test', () => {
  before(() => {
    cy.openUrl();
    cy.login();
  })
  it('should be able to add New Content', () => {
  
    //go to Content Manger from the Dashboard
    cy.get(CONTENT.CONTENT_MANAGER).click();
    cy.title().should('eq', contentPageTitle);

    //get the number of content table rows before a content is added
    cy.get(COUNTER.CONTENT_ROWS).find("tr").its('length').as('numberOfContentRows');

    //add content
    cy.addContent();

    //check the number of content table rows after a content is added
    cy.get('@numberOfContentRows').then(numberOfContentRows => {
      cy.get(COUNTER.CONTENT_ROWS).find("tr").should("have.length", numberOfContentRows + 1);
    })
  });
})
