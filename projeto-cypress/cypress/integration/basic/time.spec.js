describe('Testes Dinâmicos', () => {

    //Executado uma unica vez antes de todos os testes
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    //Executado uma vez antes de cada teste
    beforeEach(() => {
        cy.reload();
    })

    it('Voltar data do sistema', () => {
        // cy.get('#buttonNow').click();
        // cy.get('#resultado > span').should('contain', '17/07/2020');

        // cy.clock();
        // cy.get('#buttonNow').click();
        // cy.get('#resultado > span').should('contain', '31/12/1969');

        // Clock só executa uma vez por teste
        const dt = new Date(2012, 6, 17, 19, 1, 50);
        cy.clock(dt.getTime());
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '17/07/2012');
    })

    it('Avançar data do sistema', () => {
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(parseInt).should('gt', 1342562510000);

        cy.clock();
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(parseInt).should('lte', 0);

        cy.tick(5000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(parseInt).should('gte', 5000);

        cy.tick(10000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text').then(parseInt).should('gte', 15000);
    })

})