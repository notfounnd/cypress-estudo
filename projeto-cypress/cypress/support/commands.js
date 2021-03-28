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

Cypress.Commands.add('getToken', (username, password) => {
    cy.request({
        url: '/signin',
        method: 'POST',
        body: {
            email: username,
            senha: password,
            redirecionar: false
        }
    })
    .its('body.token').should('not.be.empty')
    .then(token => {
        Cypress.env('token', token)
        return token
    })
})

Cypress.Commands.add('resetREST', () => {
    cy.request({
        url: '/reset',
        method: 'GET',
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('getAccountByName', (accountName) => {
    cy.request({
        url: '/contas',
        method: 'GET',
        qs: {
            nome: accountName
        }
    }).then(response => {
        return response
    })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1) {
        if(Cypress.env('token')){
            options[0].headers = { Authorization: `JWT ${Cypress.env('token')}` }
        }
    }

    return originalFn(...options)
})
