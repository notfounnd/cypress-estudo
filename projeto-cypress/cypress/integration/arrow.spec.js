it('Arrow Function', function () {})

// Função básica
// function soma(a, b) {
//     return a + b
// }

// Função constante
// const soma = function (a, b) {
//     return a + b
// }

// Função arrow
// const soma = (a, b) => {
//     return a + b
// }

// Função arrow
// const soma = (a, b) => a + b

// Função arrow
// const soma = (a) => a + a

// Função arrow
const soma = () => 3 + 5

console.log(soma(2, 5))

// Teste com função
it('Test with function', function() {
    console.log('Function', this)
})

// Teste com arrow
it('Test with arrow',() => {
    console.log('Arrow', this)
})