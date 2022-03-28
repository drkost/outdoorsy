import { username, password, url, urlLoggedAsAdmin, homePageTitle, loginPageTitle, randomContentTypeText } from '../data/outdoorsy_constants';
import { CREDENTIALS, COUNTER, CONTENT } from '../data/outdoorsy_selectors';

Cypress.Commands.add('openUrl', () => { 
    cy.visit(url);
    cy.request(url)
    .should((response) => {
        expect(response.status).to.eq(200) ;   
        cy.get(CREDENTIALS.USERNAME).should('be.visible'); 
        cy.get(CREDENTIALS.PASSWORD).should('be.visible');  
        cy.get(CREDENTIALS.SUBMIT).should('be.visible');  
        cy.title().should('eq', loginPageTitle); 
    })
}); 

Cypress.Commands.add('login', () => { 
    cy.get(CREDENTIALS.USERNAME).type(username); 
    cy.get(CREDENTIALS.PASSWORD).type(password);
    cy.get(CREDENTIALS.SUBMIT).click();
    cy.request(urlLoggedAsAdmin)
    .should((response) => {
        expect(response.status).to.eq(200) ;   
        cy.get(CREDENTIALS.SUCCESS).should('be.visible'); 
        cy.title().should('eq', homePageTitle);
    })
});
Cypress.Commands.add('addContent', () => { 
    cy.get(CONTENT.ADD_NEW_CONTENT).click();
    cy.get(CONTENT.ADD_CONTENT_TITLE).type(randomContentTypeText);
    cy.get(CONTENT.SUBMIT_NEW).click();
});

