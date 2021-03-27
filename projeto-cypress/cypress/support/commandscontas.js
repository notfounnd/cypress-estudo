import locator from './locators'

Cypress.Commands.add('accessAccountMenu', () => {
    cy.get(locator.MENU.SETTINGS).click()
    cy.get(locator.MENU.ACCOUNTS).click()
})

Cypress.Commands.add('insertAccount', conta => {
    cy.get(locator.ACCOUNTS.NAME).type(conta)
    cy.get(locator.ACCOUNTS.BTN_SAVE).click()
})
