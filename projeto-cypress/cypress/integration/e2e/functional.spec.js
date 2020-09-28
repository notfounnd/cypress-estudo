/// <reference types="cypress" />

describe('Iframes', () => {

    //Executado uma unica vez antes de todos os testes
    // before(() => {
    //     cy.visit('http://wcaquino.me/cypress/componentes.html')
    // })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload()
    })

    it('Deve preencher campo de texto no iframe', function () {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then( iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('texto para o iframe')
                .should('have.value', 'texto para o iframe')

            //Alert de origem do iframe é restrição de uso no cypress
            // cy.on('window:alert', msg => {
            //     expect(msg).to.be.equal('Alert Simples')
            // })
            // cy.wrap(body).find('#otherButton').click()
        })
    })

    it('Deve testar iframe diretamente', function () {
        cy.visit('http://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

})