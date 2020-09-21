/// <reference types="cypress" />

// Only executa apenas o teste marcado
// Skip pula o teste
// Ambos podem ser aplicados no describe também

//it.only('Teste Externo 1', () => {})
//it.skip('Teste Externo 2', () => {})

it('Teste Externo 3', () => {

})

describe('Grupo de Teste', () => {

    describe('Subgrupo de Teste', () => {
        it('Teste Interno', () => {
    
        })
    })

    describe('Subgrupo de Teste', () => {
        it('Teste Interno', () => {
    
        })
    })

    it('Teste Interno', () => {

    })
})