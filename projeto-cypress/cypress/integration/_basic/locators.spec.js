/// <reference types="cypress" />

describe('Entendendo Locators', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload();
    })

    it('Utilizando jQuery Selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]');
        cy.get('table#tabelaUsuarios tbody > tr:nth-child(1) td:nth-child(3)');
        cy.get('[onclick*="Francisco"]');
        cy.get('#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input');
        cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input');
    })

    it('Utilizando Xpath', () => {
        cy.xpath('//input[contains(@onclick, "Francisco")]');
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(.,"Francisco")]/..//input[@type="text"]');
        cy.xpath('//td[contains(.,"Usuario A")]/following-sibling::td[contains(.,"Mestrado")]/..//input[@type="text"]').type('Funciona').click();
    })
})