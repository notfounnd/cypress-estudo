/// <reference types="cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 };
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property', 'nome');

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').then($el => {
            cy.wrap($el).type('Wrap para o Cypress');
        });
    })

    it('Wrap + Promisse + Crypress', () => {
        const promisse = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10);
            }, 500);
        })

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        
        cy.get('#buttonSimple').then(() => {
            console.log('Encontrei o primeiro botão');
        });
        cy.wrap(promisse).then(retorno => {
            console.log(retorno);
        });
        cy.get('#buttonList').then(() => {
            console.log('Encontrei o segundo botão');
        });


    })

    it('Wrap + Promisse - Crypress', () => {
        const promisse = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10);
            }, 500);
        })

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        
        cy.get('#buttonSimple').then(() => {
            console.log('Encontrei o primeiro botão');
        });

        promisse.then(retorno => {console.log(retorno);});
        
        cy.get('#buttonList').then(() => {
            console.log('Encontrei o segundo botão');
        });
    })

    it('Its', () => {
        const obj = { nome: 'User', idade: 20 };
        cy.wrap(obj).should('have.property', 'nome', 'User');
        cy.wrap(obj).its('nome').should('be.equal', 'User');
        
        const obj2 = {
            nome: 'User',
            idade: 20,
            endereco: {
                rua: 'Rua do Teste'
            }
        };
        cy.wrap(obj2).its('endereco').should('have.property', 'rua');
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'Teste');
        cy.wrap(obj2).its('endereco.rua').should('contain', 'Teste');

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.title().its('length').should('be.equal', 20);
    })

    it.only('Invoke', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;
        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1);
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7);

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').invoke('val', 'Texto via invoke');
        cy.window().invoke('alert', 'Mensagem do alert');
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked" />')
    })
})