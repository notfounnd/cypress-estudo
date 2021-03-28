/// <reference types="cypress" />

describe('Esperas do Cypress', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload();
    })

    it('Aguardar o elemento ficar disponivel', () => {
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        cy.get('#novoCampo').should('exist');
        cy.get('#novoCampo').type('funciona');
    })

    it('Uso do find', () => {
        cy.get('#buttonList').click();

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1');

        // Find não funciona muito bem nesse modelo
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 2');

        cy.get('#lista li span')
            .should('contain', 'Item 2');
    })

    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo', {timeout: 5000}).should('exist');
    })

    // Inserir configuração no arquivo cypress.json
    // { "defaultCommandTimeout": 1000 }
    // it('Uso do timeout - Configuração Global', () => {
    //     cy.get('#buttonDelay').click();
    //     cy.get('#novoCampo').should('exist');
    // })

    it('Uso do wait', () => {
        cy.get('#buttonListDOM').click();
        cy.wait(5000);
        cy.get('#lista li span')
            .should('contain', 'Item 2');
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', '111');
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click();

        // Exemplo com then
        // cy.get('#lista li span').then($el => {
        //     console.log($el);
        //     expect($el).to.have.length(1);
        // });

        // Exemplo com should
        // cy.get('#lista li span').should($el => {
        //     console.log($el);
        //     expect($el).to.have.length(1);
        // });

        // Modificando retorno - then modifica retorno
        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1);
            return 2;
        }).and('eq', 2)
            .and('not.have.id', 'buttonListDOM');

        // Modificando retorno - should não modifica retorno
        // cy.get('#buttonListDOM').should($el => {
        //     expect($el).to.have.length(1);
        //     return 2;
        // }).and('eq', 2)
        //     .and('not.have.id', 'buttonListDOM');

        // Buscar elemento dentro de get tem que ser feito com then
        cy.get('#lista li span').then($el => {
            expect($el).to.have.length(1);
            cy.get('#buttonListDOM');
        });

        // Buscar elemento dentro de get usando should a ferramenta se perde
        // cy.get('#lista li span').should($el => {
        //     expect($el).to.have.length(1);
        //     cy.get('#buttonListDOM');
        // });

    })

})