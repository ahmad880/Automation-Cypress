const variable1= require('../PageElements/NewPayment.json')

export class NewPayment {
    goToNewPaymentPage(){
        cy.get(variable1.newPaymentPageLocators.newPaymentHeader).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.createAPayment).should('contain.text','Create a Payment')
    }
    validateSearchField(search){
        cy.get(variable1.newPaymentPageLocators.searchField).should('be.visible').type(search)
        cy.get(variable1.newPaymentPageLocators.createAPayment).should('contain.text','Create a Payment')
    }
    validateAddRecipient(){
        cy.get(variable1.newPaymentPageLocators.searchField).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.addRecipient).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.addRecipientPageHeading).should('contain.text','Recipient Details')
    }
    selectCurrency(currency){
        cy.get(variable1.newPaymentPageLocators.enterPaymentDetailsHeading).should('contain.text','Enter Payment Details')
        cy.get(variable1.newPaymentPageLocators.selectCurrency).should('exist').click()
        cy.get('[src*="/static/media/'+currency+'"]').eq(0).should('be.visible').click()
        cy.get(variable1.newPaymentPageLocators.sendAmount).type('130')
    }
    checkFundingMethod(){
        cy.get(variable1.newPaymentPageLocators.fundingMethodHeading).should('contain.text','Funding Method')
        cy.get(variable1.newPaymentPageLocators.fundingMethodField).should('be.disabled')
    }
    validateFxRateTimer(){
        cy.get(variable1.newPaymentPageLocators.fxRateTimer).should('be.visible').should('contain.text','30s')
        cy.wait(30000)
        cy.get(variable1.newPaymentPageLocators.fxRateTimer).should('be.visible').should('contain.text','0s')
        cy.get(variable1.newPaymentPageLocators.fxRateTimer).should('be.visible').should('contain.text','30s')
    }
    validatePayTheRecipient(){
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').should('be.visible').click()
        cy.get("div[title='Payment of Salaries']").click()
        cy.get('.m-t-20 > :nth-child(1) > .ant-card > .ant-card-body > :nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('contain.text','Payment Reference')
        cy.get('#paymentReference').should('be.visible').type('Single')
        cy.get('.ant-row-end.m-t-20 > .ant-col > .ant-btn').should('be.visible').click()//procee btn
        cy.get('.ant-typography.fs-24px.medium.dark-green').should('contain.text','Payment Confirmation') // confirmation msg
        cy.get("div[class='ant-row ant-row-center m-t-20'] div:nth-child(2) button:nth-child(1)").should('be.visible').click() //pay btn
        cy.get('.ant-typography.ant-typography-success.fs-24px.medium').should('contain.text',' Payment Booked - ') //Success msg
    }
    validateVeiwPayment(){
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(1) > .ant-btn').click()//view payment
        cy.get(':nth-child(1) > .ant-col > .ant-typography').should('contain.text','Payment History')
    }
    validatePaymentHistory(){
        
    }
}