it('Sem teste aqui', () => {})

// Aplicando Promises
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(9);
        }, 2000)
    })
}

// Utilizando Promises
const promises = () => {
    console.log('init');
    const prom = getSomething();
    prom.then(some => {
        console.log(`Somethin is ${some}`)
    })
    console.log('end')
}

promises();