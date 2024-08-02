const variable1 = require('../PageElements/accountingConfiguration.json')
export class accountingConfiguration {
    goToAccountingConfiguration() {
        cy.get(variable1.accountingConfigurationLocators.walletHeading).should('contain.text', 'Wallet Dashboard')
        cy.get(variable1.accountingConfigurationLocators.menubutton).should('be.visible').click()
        cy.get(variable1.accountingConfigurationLocators.accountingFromMenu).should('contain.text', 'Accounting').click()
        cy.get(variable1.accountingConfigurationLocators.configurationHeading).should('contain.text', 'Configuration')
    }
    contentValidation() {
        //static wait for the page to load completely
        cy.wait(4000)
        cy.get(variable1.accountingConfigurationLocators.whichProduct).should('be.visible').should('contain.text', 'Which Products Do You Wish To Sync?')
        cy.get(variable1.accountingConfigurationLocators.cardTransactions).should('be.visible').should('contain.text', 'Card Transactions')
        //cy.get(variable1.accountingConfigurationLocators.istradioButton).should('be.visible').should('be.checked')
        cy.get(variable1.accountingConfigurationLocators.bankFeeds).should('be.visible').should('contain.text', 'Do you wish to sync bank feeds/movement of funds?')
        cy.get(variable1.accountingConfigurationLocators.istToggle).should('be.visible').should('not.be.checked')
        cy.get(variable1.accountingConfigurationLocators.expenseInformation).should('be.visible').should('contain.text', 'For Your Card Transactions, Do You Wish To Sync Expense Information?')
        cy.get(variable1.accountingConfigurationLocators.secondToggle).should('be.visible')
        cy.get(variable1.accountingConfigurationLocators.whichCard).should('be.visible').should('contain.text', 'Which Volopa Cards Do You Wish To Sync?')
        cy.get(variable1.accountingConfigurationLocators.allCard).should('be.visible').should('contain.text', 'All Cards')
        //cy.get(variable1.accountingConfigurationLocators.allCardRadio).should('be.visible').should('be.checked')
        cy.get(variable1.accountingConfigurationLocators.AccountField).should('be.visible')
        cy.get(variable1.accountingConfigurationLocators.createNewAccount).should('be.visible').should('be.enabled')
        cy.get(variable1.accountingConfigurationLocators.volopaCategory).should('be.visible').should('contain.text', 'Volopa Category')
        cy.get(variable1.accountingConfigurationLocators.accountCode).should('be.visible').should('contain.text', 'Account Code')
        cy.get(variable1.accountingConfigurationLocators.vatCode).should('be.visible').should('contain.text', 'VAT Code')
        cy.get(variable1.accountingConfigurationLocators.trackingCodes).should('be.visible').should('contain.text', 'Volopa Tracking Codes')
        cy.get(variable1.accountingConfigurationLocators.trackingCategories).should('be.visible').should('contain.text', 'Tracking Categories')
        cy.get(variable1.accountingConfigurationLocators.addTrackingCode).should('be.visible').should('contain.text','+ Add Tracking Code').should('be.enabled')
        cy.get(variable1.accountingConfigurationLocators.saveSetting).should('be.visible').should('contain.text','Save Setting').should('be.enabled')
        cy.get(variable1.accountingConfigurationLocators.disconnectStatement).should('be.visible').should('contain.text','If you wish to disconnect Volopa from your accounting software, please click')
        cy.get(variable1.accountingConfigurationLocators.here).should('be.visible').should('contain.text','here')

    }
}