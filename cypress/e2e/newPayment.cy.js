/// <reference types = "Cypress"/>

import { SigninPage } from "../PageObject/PageAction/SigninPage"
import { NewPayment } from "../PageObject/PageAction/NewPayment"
import { PaymentsDashboard } from "../PageObject/PageAction/paymentsDashboard"

const signin = new SigninPage
const paymentspage = new PaymentsDashboard
const newPayment = new NewPayment

describe('New Payment',function(){
    let userName = 'qwerty_admin_1'
    let password = 'testTest1'
    beforeEach(() => {
        cy.visit('https://webapp8.volopa.com/')
        paymentspage.clearCache()
        signin.Login(userName, password)
        cy.viewport(1440,1000)
    })

    it('TC_NP_001 - Verify that user landed on the New Payment page', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
    })
    it('TC_NP_002 - Verify that user can search the existing recipients in the search bar', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Y17{enter}')
    })
    it('TC_NP_003 - Verify that "Add recipient" button under Seach Bar navigates to Recipient Details Page', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateAddRecipient()
    })
    it('TC_NP_004 - Verify that user is able to navigate Create a Payment page', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Y17{enter}')
    })
    it('TC_NP_005 - Verify that Funding Method (Easy Transfer and Push Funds) is not available for currencies other than GBP and Euro', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Y17{enter}')
        newPayment.selectCurrency("AUD")
        newPayment.checkFundingMethod()
    })
    it('TC_NP_006 - Verify that FX rate is appearing and will refresh every 30 seconds.', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Y17{enter}')
        newPayment.selectCurrency("AUD")
        newPayment.validateFxRateTimer()
    })
    it('TC_NP_007 - Verify that user is able to navigate "Recipient List" on clicking the "View Details" button under the "Recipient Details" tag present on Create a payment Page', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Y17{enter}')
        cy.get('.ant-row-nspace-between > :nth-child(1) > .ant-typography').should('contain.text','Recipient Details')
        cy.get('[style="padding-left: 12px; padding-right: 12px; flex: 1 1 auto;"] > .ant-row > .ant-col').should('be.visible').click()
        cy.get(':nth-child(1) > .ant-col > .ant-typography').should('contain.text','Recipient Details')
    })
    xit('TC_NP_008 - Verify that user is able to pay the recipient (Not yapily flow - Currencies other than "Euro" and "GBP")', function(){
        paymentspage.goToPaymentsDashborad()
        // newPayment.goToNewPaymentPage()
        // newPayment.validateSearchField('Y17{enter}')
        // newPayment.selectCurrency("AUD")
        // newPayment.validatePayTheRecipient()
        // newPayment.validateVeiwPayment()
        cy.get('.ant-tabs-nav-list > :nth-child(5)').click()
        cy.get('[data-row-key="0"] > :nth-child(2)').should('exist')
        const date = '[data-row-key="0"] > :nth-child(2)'
        cy.get(date).then($dateElement => {
            // Assuming the date is stored as text inside the element
            const dateValue = $dateElement.text();
            cy.log('Date value:', dateValue);
        })
        cy.get('[data-row-key="0"] > :nth-child(3)').should('exist')
        const payment = '[data-row-key="0"] > :nth-child(3)'
        cy.get(payment).then($payment => {
            // Assuming the date is stored as text inside the element
            const paymentstatus = $payment.text();
            cy.log('payment:', paymentstatus);
            cy.get('[data-row-key="0"] > :nth-child(2)').click()
            cy.get(':nth-child(4) > .ant-card-body > .ant-row > :nth-child(2)').should('exist')
        const payment1 = ':nth-child(4) > .ant-card-body > .ant-row > :nth-child(2)'
        cy.get(payment1).then($payment1 => {
            // Assuming the date is stored as text inside the element
            const paymentstatus1 = $payment1.text();
            cy.log('payment:', paymentstatus1);
            expect(paymentstatus).to.equal(paymentstatus1)
        })
        })
    })
    it('TC_NP_009 - Verify that after paying the recipient, user is able to proceed to a new payment', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Y17{enter}')
        newPayment.selectCurrency("USD")
        newPayment.validatePayTheRecipient()
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(2) > .ant-btn').should('be.visible').click()//new payment
    })
    it('TC_NP_010 - Verify that after paying the recipient, user is able to proceed to a new payment', function(){
        paymentspage.goToPaymentsDashborad()
        newPayment.goToNewPaymentPage()
        newPayment.validateSearchField('Ali{enter}')
        newPayment.selectCurrency("EUR")
        cy.get(':nth-child(2) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').should('be.visible').click()
        cy.get("div[title='Payment of Salaries']").click()
        cy.get('.m-t-20 > :nth-child(1) > .ant-card > .ant-card-body > :nth-child(1) > .ant-col > .ant-space > [style=""] > .ant-typography').should('contain.text','Payment Reference')
        cy.get('#paymentReference').should('be.visible').type('Single')
        cy.get('.ant-row-end.m-t-20 > .ant-col > .ant-btn').should('be.visible').click()//procee btn
        cy.get('.ant-typography.fs-24px.medium.dark-green').should('contain.text','Payment Confirmation') // confirmation msg
        cy.get("div[class='ant-row ant-row-center m-t-20'] div:nth-child(2) button:nth-child(1)").should('be.visible').click() //pay btn
        cy.get('.ant-typography.ant-typography-success.fs-24px.medium').should('contain.text',' Payment Booked - ')
        cy.get('.ant-row-center.m-t-20 > .ant-col > .ant-space > :nth-child(1) > .ant-btn').should('be.visible').click()
        cy.get('.title').should('have.text','Choose your bank')
        cy.get("input[placeholder='Search all 63 banks']").type('Modelo Sandbox')
        cy.get('.hover-effect').click()
      
        // cy.get(".pb-2.currency-style").invoke('text').then((ele)=>{
        //   amount1=ele.trim()
        //   amount1= amount1.replace(/£/g,'')
        //   cy.log('amount', amount1)
        //   cy.wrap(amount1).as('Amount')
        // })
        cy.wait(2000)
        cy.get('.button-primary.mt-4.mb-2').click()
        cy.get('.title').should('contain','Approve your payment')
        cy.get("p[class='link font-size-16 mb-10 mt-4'] strong").click()     
          cy.get('.ozone-heading-1.text-ozone-primary').should('have.text','Model Bank')
          cy.get('.mt-6.ozone-heading-3').should('have.text','Please login to proceed')
          cy.get("input[placeholder='username']").type('mits')
          cy.get('#passwordField').type('mits')
          cy.get('#loginButton').click({force:true})
          cy.get('.justify-start.ozone-ais-heading-1.text-ozone-primary').should('have.text','Single Domestic Payment Consents (PIS)')
          cy.get("#radio-10000109010102").click()
          cy.get('#confirmButton').click({force:true})
          cy.get('[class="ant-typography muli semi-bold fs-24px purple"]').should('contain.text','Funds could take up to 2 hours to be posted.')
          cy.get(':nth-child(2) > .ant-btn').click()
        //  cy.get('body > div:nth-child(2) > section:nth-child(1) > main:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(1) > tbody:nth-child(3) > tr:nth-child(2) > td:nth-child(6) > span:nth-child(1)').click()
        //   cy.get('@Amount').then(Amount=>{
        //   cy.get('.ant-typography.m-t-10.m-l-10.medium.bold.fs-18px').invoke('text').then(ele1=>{
        //     let val= ele1.trim()
        //     cy.wrap(val).should('contain','GBP')
        //     val=val.replace(/GBP/g,'')
        //     cy.wrap(parseFloat(Amount)).should('eq',parseFloat(val))
        // })
        // })
    })
})