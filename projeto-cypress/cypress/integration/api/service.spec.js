/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    // let token
    const username = 'sbrissa_cypress@teste.com'
    const password = 'cypress123'

    //Executado uma unica vez antes de todos os testes
    before(() => {
        //Token extraido no método para uma variável de ambiente
        cy.getToken(username, password)
        // .then(responseToken => {
        //     token = responseToken
        // })
    })
    
    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.resetREST()
    })

    it('Should create an account', () => {
        //Realizado overwrite no método 'request' para não precisar declarar header Authorization em toda chamada
        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta 1 via REST'
            }
        }).as('response')
            
        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(201)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('nome', 'Conta 1 via REST')
        })
    })

    it('Should update an account', () => {
        cy.getAccountByName('Conta para movimentacoes')
        .then(response => {
            cy.request({
                url: `/contas/${response.body[0].id}`,
                method: 'PUT',
                body: {
                    nome: 'Conta alterada via REST'
                }
            }).as('response')
        })


        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create an account with same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
            
        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction', () => {
        cy.getAccountByName('Conta para movimentacoes')
        .then(response => {
            cy.request({
                url: '/transacoes',
                method: 'POST',
                body: {
                    conta_id: `${response.body[0].id}`,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: 'Movimentação',
                    envolvido: 'Jhon Doe',
                    status: true,
                    tipo: 'REC',
                    valor: '1000'
                }
            }).as('response')
        })
            
        cy.get('@response').then(response => {
            expect(response.status).to.be.equal(201)
        })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Should get balance', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
        }).then(response => {
            let balance = null
            response.body.forEach(el => {
                if(el.conta === 'Conta para saldo') balance = el.saldo
            })
            expect(balance).to.be.equal('534.00')
        })

        cy.request({
            url: '/transacoes',
            method: 'GET',
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(response => {
            console.log(response)
            cy.request({
                url: `/transacoes/${response.body[0].id}`,
                method: 'PUT',
                body: {
                    status: true,
                    data_transacao: Cypress.moment(response.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(response.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: response.body[0].descricao,
                    envolvido: response.body[0].envolvido,
                    valor: response.body[0].valor,
                    conta_id: response.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
        }).then(response => {
            let balance = null
            response.body.forEach(el => {
                if(el.conta === 'Conta para saldo') balance = el.saldo
            })
            expect(balance).to.be.equal('4034.00')
        })

    })

    it('Should remove a transaction', () => {
        cy.request({
            url: '/transacoes',
            method: 'GET',
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(response => {
            cy.request({
                url: `/transacoes/${response.body[0].id}`,
                method: 'DELETE',
            }).its('status').should('be.equal', 204)
        })
    })

})