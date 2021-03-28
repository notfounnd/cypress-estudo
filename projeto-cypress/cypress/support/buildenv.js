const buildEnv = () => {
    cy.server()

    cy.route({
        url: '/signin',
        method: 'POST',
        response: {
                id: 1000,
                nome: 'Fake User',
                token: 'String grande de exemplo para simular token abcdefghijklmnopqrstuvwxyz1234567890'
            }
    }).as('signin')
    
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
                saldo: '9500.00'
            }]
    }).as('saldo')

    cy.route({
        url: '/contas',
        method: 'GET',
        response: [
            { id: 9998, nome: 'Fake Account 1', visivel: true, usuario_id: 1000 },
            { id: 9999, nome: 'Fake Account 2', visivel: true, usuario_id: 1000 },
            { id: 10000, nome: 'Fake Account 3', visivel: true, usuario_id: 1000 }
    ]
    }).as('contas')

    cy.route({
        url: '/extrato/**',
        method: 'GET',
        response: 'fixture:transaction'
    }).as('extrato')
}

export default buildEnv