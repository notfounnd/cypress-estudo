/// <reference types="cypress" />

import '../../support/commandscontas'
import locator from '../../support/locators'

describe('Should test at a functional level', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.login('sbrissa_cypress@teste.com', 'cypress123')
    })
    
    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.get(locator.MENU.HOME).click()
        cy.resetApp()
    })

    it('Should create an account', () => {
        cy.accessAccountMenu()
        cy.insertAccount('Conta 1')
        cy.get(locator.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.accessAccountMenu()
        cy.xpath(locator.ACCOUNTS.FN_XPATH_BTN_UPDATE('Conta para alterar')).click()
        cy.get(locator.ACCOUNTS.NAME)
            .clear()
            .type('Conta Alterada')
        cy.get(locator.ACCOUNTS.BTN_SAVE).click()
        cy.get(locator.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.accessAccountMenu()
        cy.insertAccount('Conta mesmo nome')
        cy.get(locator.MESSAGE)
            .should('contain', 'Error')
            .should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(locator.MENU.TRANSACTION).click()

        cy.get(locator.TRANSACTION.DESCRIPTION).type('Movimentação')
        cy.get(locator.TRANSACTION.VALUE).type('1000')
        cy.get(locator.TRANSACTION.SOURCE).type('Jhon Doe')
        cy.get(locator.TRANSACTION.ACCOUNT).select('Conta para movimentacoes')
        cy.get(locator.TRANSACTION.STATUS).click()
        cy.get(locator.TRANSACTION.BTN_SAVE).click()
        cy.get(locator.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

        cy.get(locator.EXTRACT.ROWS).should('have.length', 7)
        cy.xpath(locator.EXTRACT.FN_XPATH_ELEMENT('Movimentação','1.000,00')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(locator.MENU.HOME).click()
        cy.xpath(locator.BALANCE.FN_XPATH_BALANCE_ACCOUNT('Conta para saldo')).should('contain', '534,00')

        cy.get(locator.MENU.EXTRACT).click()
        cy.xpath(locator.EXTRACT.FN_XPATH_BTN_UPDATE('Movimentacao 1, calculo saldo')).click()
        cy.get(locator.TRANSACTION.DESCRIPTION).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(locator.TRANSACTION.STATUS).click()
        cy.get(locator.TRANSACTION.BTN_SAVE).click()
        cy.get(locator.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')

        cy.get(locator.MENU.HOME).click()
        cy.xpath(locator.BALANCE.FN_XPATH_BALANCE_ACCOUNT('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.get(locator.MENU.EXTRACT).click()
        cy.xpath(locator.EXTRACT.FN_XPATH_BTN_TRASH('Movimentacao para exclusao')).click()
        cy.get(locator.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })

})