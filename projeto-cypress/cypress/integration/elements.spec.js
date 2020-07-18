/// <reference types="cypress" />

describe('Elementos Básicos', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload();
    })

    it('Textos', () => {
        cy.get('body').should('contain', 'Cuidado');
        cy.get('span').should('contain', 'Cuidado');
        cy.get('.facilAchar').should('contain', 'Cuidado');
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
    })

    it('Links', () => {
        cy.get('a[href="#"]').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
        
        cy.reload();
        cy.contains('Voltar').click();
        cy.get('#resultado').should('have.text', 'Voltou!');
    })

    it('Campos de Texto', () => {
        cy.get('#formNome')
            .type('Cypress Test')
            .should('have.value', 'Cypress Test');
            
        cy.get('#elementosForm\\:sugestoes')
            .type('textarea')
            .should('have.value', 'textarea');
        
        cy.get(':nth-child(2) > :nth-child(6) > input')
            .type('???');
        
        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123');

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}Acerto', { delay: 100 })
            .should('have.value', 'Acerto');
    })

    it('Radio Button', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked');
            
        cy.get('#formSexoMasc')
            .should('not.be.checked');

        cy.get('[name="formSexo"]')
            .should('have.length', 2);
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked');

        cy.get('[name="formComidaFavorita"]')
            .click({ multiple: true})

        cy.get('#formComidaPizza')
            .should('not.be.checked');

        cy.get('#formComidaVegetariana')
            .should('be.checked');
    })

    it('Combo Box', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp');

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp');

        // Validando lista do combo
        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8);

        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = [];
            $arr.each(function(){
                values.push(this.innerHTML);
            })
            expect(values).to.include.members(['Superior', 'Mestrado']);
        })
    })

    it('Combo Box Multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada']);

        // Validando lista do combo
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada']);
            expect($el.val()).to.have.length(3);
        })

        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida', 'nada']);
    })

})