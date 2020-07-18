/// <reference types="cypress" />

describe('Trabalhando com Alerts', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload();
    })

    it('Alert', () => {
        cy.clickAlert('#alert', 'Alert Simples');
    })

})