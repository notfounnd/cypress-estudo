const locators = {
    LOGIN: {
        USERNAME: '[data-test=email]',
        PASSWORD: '[data-test=passwd]',
        BTN_LOGIN: '.jumbotron > button[type="submit"]'
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        TRANSACTION: '[data-test=menu-movimentacao]',
        EXTRACT: '[data-test=menu-extrato]',
        SETTINGS: '[data-test=menu-settings]',
        ACCOUNTS: '[href="/contas"]',
        RESET: '[href="/reset"]'
    },
    TRANSACTION: {
        DESCRIPTION: '[data-test=descricao]',
        VALUE: '[data-test=valor]',
        SOURCE: '[data-test=envolvido]',
        ACCOUNT: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SAVE: '.btn-primary'
    },
    EXTRACT: {
        ROWS: '.list-group > li',
        FN_XPATH_ELEMENT: (description, value) => `//div[@class="list-group"]//span[contains(.,"${description}")]/following-sibling::small[contains(.,"${value}")]`,
        FN_XPATH_BTN_UPDATE: transaction => `//span[contains(.,"${transaction}")]/../../..//i[contains(@class,"edit")]`,
        FN_XPATH_BTN_TRASH: transaction => `//span[contains(.,"${transaction}")]/../../..//i[contains(@class,"trash")]`,
        FN_XPATH_TABLE_ROW: transaction => `//span[contains(.,"${transaction}")]/../../../..`
    },
    ACCOUNTS: {
        NAME: '[data-test=nome]',
        BTN_SAVE: '.col-2 > [type="button"]',
        FN_XPATH_BTN_UPDATE: name => `//table//td[contains(text(),"${name}")]/..//i[contains(@class,"edit")]`
    },
    BALANCE: {
        FN_XPATH_BALANCE_ACCOUNT: name => `//td[contains(.,"${name}")]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators