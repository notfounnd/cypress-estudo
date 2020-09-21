/// <reference types="cypress" />

describe('Cypress Basic', () => {

    it.only('Visitar página e verificar o título', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');

        // cy.pause();

        cy.title().should('be.equal', 'Campo de Treinamento');
        // cy.title().should('contain', 'Campo').debug();
        cy.title().should('contain', 'Campo');

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo');

        // Mesmo comportamento com should
        cy.title().then(title => {
            console.log(title);
        })

        // Mesmo comportamento com then
        cy.title().should(title => {
            console.log(title);
        })

        // Reaproveitando valores
        let syncTitle;
        cy.title().then(title => {
            console.log(title);
            cy.get('#formNome').type(title);
            syncTitle = title;
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle);
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle);
        })
    })

    it('Visitar página e interagir com um elemento', () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!');
    })
})