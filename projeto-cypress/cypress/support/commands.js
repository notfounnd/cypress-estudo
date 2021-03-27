// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import locator from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click();
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message);
    });
})

Cypress.Commands.add('login', (username, password) => {
    cy.get(locator.LOGIN.USERNAME).type(username)
    cy.get(locator.LOGIN.PASSWORD).type(password)
    cy.get(locator.LOGIN.BTN_LOGIN).click()
    cy.get(locator.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.RESET).click()
})
