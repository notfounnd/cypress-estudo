/// <reference types="cypress" />

describe('Testes Dinâmicos', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload();
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano'];

    foods.forEach(food => {
        it(`Cadastro com comida a comida ${food}`, function () {
            cy.fixture('userData').as('usuario').then(() => {
    
                cy.get('#formNome').type(this.usuario.nome);
                cy.get('#formSobrenome').type(this.usuario.sobrenome);
                cy.get(`[name="formSexo"][value="${this.usuario.sexo}"]`).click();
                cy.xpath(`//label[contains(.,"${food}")]/preceding-sibling::input`).click();
                cy.get('#formEscolaridade').select(this.usuario.escolaridade);
                cy.get('#formEsportes').select(this.usuario.esportes);
    
            })
            cy.get('#formCadastrar').click();
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
        })
    })

    it.only('Cadastro com todas as comidas', function () {
        cy.fixture('userData').as('usuario').then(() => {
    
            cy.get('#formNome').type(this.usuario.nome);
            cy.get('#formSobrenome').type(this.usuario.sobrenome);
            cy.get(`[name="formSexo"][value="${this.usuario.sexo}"]`).click();

            cy.get('[name="formComidaFavorita"]').each($el => {
                //$el.click();
                if($el.val() != 'vegetariano')
                    cy.wrap($el).click();
            });

            cy.get('#formEscolaridade').select(this.usuario.escolaridade);
            cy.get('#formEsportes').select(this.usuario.esportes);

        })
        // cy.clickAlert('#formCadastrar', 'Tem certeza que você é vegetariano?')
        cy.get('#formCadastrar').click();
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
    })

})