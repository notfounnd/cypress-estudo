/// <reference types="cypress" />

import '../../support/commandscontas'
import locator from '../../support/locators'
import buildEnv from '../../support/buildenv'

describe('Should test at a functional level', () => {
    
    //Executado uma vez antes de cada teste
    beforeEach(() => {
        buildEnv()
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.login('sbrissa_cypress@teste.com', 'fake_password')
        cy.get(locator.MENU.HOME).click()
        //cy.resetApp()
    })

    //Executado uma vez após todos os testes
    after(() => {
        cy.clearLocalStorage()
    })

    it('Should create an account', () => {
        cy.route({
            url: '/contas',
            method: 'POST',
            response: {id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 13912 }
        }).as('contas')

        cy.accessAccountMenu()

        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 9998, nome: 'Fake Account 1', visivel: true, usuario_id: 1000 },
                { id: 9999, nome: 'Fake Account 2', visivel: true, usuario_id: 1000 },
                { id: 10000, nome: 'Fake Account 3', visivel: true, usuario_id: 1000 },
                { id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 1000 }
        ]
        }).as('contas')

        cy.insertAccount('Conta 1')
        cy.get(locator.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should update an account', () => {
        cy.route({
            url: '/contas/**',
            method: 'PUT',
            response: { id: 9998, nome: 'Conta Alterada', visivel: true, usuario_id: 1000 }
        }).as('contas')

        cy.accessAccountMenu()
        cy.xpath(locator.ACCOUNTS.FN_XPATH_BTN_UPDATE('Fake Account 1')).click()
        cy.get(locator.ACCOUNTS.NAME)
            .clear()
            .type('Conta Alterada')
        cy.get(locator.ACCOUNTS.BTN_SAVE).click()
        cy.get(locator.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.accessAccountMenu()
        
        cy.route({
            url: '/contas',
            method: 'POST',
            status: 400,
            response: { error: 'Já existe uma conta com esse nome!' }
        }).as('contas')

        cy.insertAccount('Fake Account 1')
        cy.get(locator.MESSAGE)
            .should('contain', 'Error')
            .should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.route({
            url: '/transacoes',
            method: 'POST',
            status: 201,
            response: {
                id: 987654,
                descricao: 'Movimentação',
                envolvido: 'Jhon Doe',
                observacao: null,
                tipo: 'REC',
                data_transacao: '2021-03-28T03:00:00.000Z',
                data_pagamento: '2021-03-28T03:00:00.000Z',
                valor: '1000.00',
                status: true,
                conta_id: 9999,
                usuario_id: 1000,
                transferencia_id: null,
                parcelamento_id: null
            }
        }).as('transacoes')

        cy.route({
            url: '/extrato/**',
            method: 'GET',
            response: 'fixture:updatedTransaction'
        }).as('extrato')

        cy.get(locator.MENU.TRANSACTION).click()

        cy.get(locator.TRANSACTION.DESCRIPTION).type('Transaction 4')
        cy.get(locator.TRANSACTION.VALUE).type('1000')
        cy.get(locator.TRANSACTION.SOURCE).type('Jhon Doe')
        cy.get(locator.TRANSACTION.ACCOUNT).select('Fake Account 2')
        cy.get(locator.TRANSACTION.STATUS).click()
        cy.get(locator.TRANSACTION.BTN_SAVE).click()
        cy.get(locator.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')

        cy.get(locator.EXTRACT.ROWS).should('have.length', 7)
        cy.xpath(locator.EXTRACT.FN_XPATH_ELEMENT('Transaction 4','1.000,00')).should('exist')
    })

    it('Should get balance', () => {
        cy.route({
            url: '/transacoes/**',
            method: 'GET',
            response: {
                conta: 'Fake Account 3',
                id: 876543,
                descricao: 'Fake Transaction 0',
                envolvido: 'Mary Doe',
                observacao: null,
                tipo: 'REC',
                data_transacao: '2021-03-28T03:00:00.000Z',
                data_pagamento: '2021-03-28T03:00:00.000Z',
                valor: '3500.00',
                status: false,
                conta_id: 10000,
                usuario_id: 1000,
                transferencia_id: null,
                parcelamento_id: null
            }
        }).as('transacoes')

        cy.route({
            url: '/transacoes/**',
            method: 'PUT',
            response: {
                conta: 'Fake Account 3',
                id: 876543,
                descricao: 'Fake Transaction 0',
                envolvido: 'Mary Doe',
                observacao: null,
                tipo: 'REC',
                data_transacao: '2021-03-28T03:00:00.000Z',
                data_pagamento: '2021-03-28T03:00:00.000Z',
                valor: '3500.00',
                status: false,
                conta_id: 10000,
                usuario_id: 1000,
                transferencia_id: null,
                parcelamento_id: null
            }
        }).as('transacoes')
        
        cy.get(locator.MENU.HOME).click()
        cy.xpath(locator.BALANCE.FN_XPATH_BALANCE_ACCOUNT('Fake Account 3')).should('contain', '9.500,00')

        cy.get(locator.MENU.EXTRACT).click()
        cy.xpath(locator.EXTRACT.FN_XPATH_BTN_UPDATE('Fake Transaction 0')).click()
        cy.get(locator.TRANSACTION.DESCRIPTION).should('have.value', 'Fake Transaction 0')
        cy.get(locator.TRANSACTION.STATUS).click()
        cy.get(locator.TRANSACTION.BTN_SAVE).click()
        cy.get(locator.MESSAGE).should('contain', 'Movimentação alterada com sucesso!')

        cy.route({
            url: '/saldo',
            method: 'GET',
            response: [{
                    conta_id: 9998,
                    conta: 'Fake Account 1',
                    saldo:'-1500.00'
                },
                {
                    conta_id: 9999,
                    conta: 'Fake Account 2',
                    saldo: '1500.00'
                },
                {
                    conta_id: 10000,
                    conta: 'Fake Account 3',
                    saldo: '4034,00'
                }]
        }).as('saldo')

        cy.get(locator.MENU.HOME).click()
        cy.xpath(locator.BALANCE.FN_XPATH_BALANCE_ACCOUNT('Fake Account 3')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.route({
            url: '/transacoes/**',
            method: 'DELETE',
            status: 204,
            response: {}
        }).as('transacoes')

        cy.get(locator.MENU.EXTRACT).click()
        cy.xpath(locator.EXTRACT.FN_XPATH_BTN_TRASH('Fake Transaction 0')).click()
        cy.get(locator.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })

    it('Should validate data send to create an account - 1', () => {
        cy.route({
            url: '/contas',
            method: 'POST',
            response: {id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 13912 }
        }).as('contas')

        cy.accessAccountMenu()

        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 9998, nome: 'Fake Account 1', visivel: true, usuario_id: 1000 },
                { id: 9999, nome: 'Fake Account 2', visivel: true, usuario_id: 1000 },
                { id: 10000, nome: 'Fake Account 3', visivel: true, usuario_id: 1000 },
                { id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 1000 }
        ]
        }).as('contas')

        cy.insertAccount('{CONTROL}') // Para simular erro
        cy.wait('@contas').its('request.body.nome').should('not.be.empty')
        cy.get(locator.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should validate data send to create an account - 2', () => {
        cy.route({
            url: '/contas',
            method: 'POST',
            response: {id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 13912 },
            onRequest: req => {
                expect(req.request.headers).to.have.property('Authorization')
                expect(req.request.body.nome).to.be.not.empty
            }
        }).as('contas')

        cy.accessAccountMenu()

        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 9998, nome: 'Fake Account 1', visivel: true, usuario_id: 1000 },
                { id: 9999, nome: 'Fake Account 2', visivel: true, usuario_id: 1000 },
                { id: 10000, nome: 'Fake Account 3', visivel: true, usuario_id: 1000 },
                { id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 1000 }
        ]
        }).as('contas')

        cy.insertAccount('{CONTROL}') // Para simular erro
        cy.get(locator.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should validate data send to create an account - 3', () => {
        const requestStub = cy.stub()

        cy.route({
            url: '/contas',
            method: 'POST',
            response: {id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 13912 },
            onRequest: requestStub
        }).as('contas')

        cy.accessAccountMenu()

        cy.route({
            url: '/contas',
            method: 'GET',
            response: [
                { id: 9998, nome: 'Fake Account 1', visivel: true, usuario_id: 1000 },
                { id: 9999, nome: 'Fake Account 2', visivel: true, usuario_id: 1000 },
                { id: 10000, nome: 'Fake Account 3', visivel: true, usuario_id: 1000 },
                { id: 10001, nome: 'Conta 1', visivel: true, usuario_id: 1000 }
        ]
        }).as('contas')

        cy.insertAccount('{CONTROL}') // Para simular erro
        cy.wait('@contas').then(() => {
            console.log(requestStub.args[0][0])
            expect(requestStub.args[0][0].request.headers).to.have.property('Authorization')
            expect(requestStub.args[0][0].request.body.nome).to.be.not.empty
        })
        cy.get(locator.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should test colors balance', () => {
        cy.route({
            url: '/extrato/**',
            method: 'GET',
            response: 'fixture:transactionStatus'
        }).as('extrato')

        cy.get(locator.MENU.EXTRACT).click()
        cy.xpath(locator.EXTRACT.FN_XPATH_TABLE_ROW('Paid Revenue Transaction')).should('have.class', 'receitaPaga')
        cy.xpath(locator.EXTRACT.FN_XPATH_TABLE_ROW('Unpaid Revenue Transaction')).should('have.class', 'receitaPendente')
        cy.xpath(locator.EXTRACT.FN_XPATH_TABLE_ROW('Expense Paid Transaction')).should('have.class', 'despesaPaga')
        cy.xpath(locator.EXTRACT.FN_XPATH_TABLE_ROW('Expense Unpaid Transaction')).should('have.class', 'despesaPendente')
    })

    it('Should test the responsiveness', () => {
        cy.get(locator.MENU.HOME).should('exist')
            .and('be.visible')

        cy.viewport(500, 700)
        cy.get(locator.MENU.HOME).should('exist')
            .and('be.not.visible')

        cy.viewport('iphone-5')
        cy.get(locator.MENU.HOME).should('exist')
            .and('be.not.visible')

        cy.viewport('ipad-2')
        cy.get(locator.MENU.HOME).should('exist')
            .and('be.visible')
    })

})