/// <reference types = "Cypress"/>

import { BatchPayments } from "../PageObject/PageAction/BatchPayments"
import { SigninPage } from "../PageObject/PageAction/SigninPage"
import { PaymentsDashboard } from "../PageObject/PageAction/paymentsDashboard"
import { AdditionalCurrencies } from "../PageObject/PageAction/AdditionalCurrencies";

const newRecipient = new AdditionalCurrencies
const batchPayments = new BatchPayments
const signin = new SigninPage
const paymentspage = new PaymentsDashboard

describe('Batch Payments',function(){
    let userName = 'qwerty_admin_1'
    let password = 'testTest1'
    beforeEach(() => {
        cy.visit('https://webapp4.volopa.com/')
        paymentspage.clearCache()
        signin.Login(userName, password)
        cy.viewport(1440,1000)
    })
    it('TC_BP_001 - Verify that user landed on the Batch Payments page', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
    })
    it('TC_BP_002 - Verify that user landed on Pay Multiple Recipients page', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
    })
    it('TC_BP_003 - Verify that user can search the existing recipients in the search bar', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
    })
    it('TC_BP_004 - Verify that "Add New Recipient" button under Seach Bar naviagtes to Recipient Details Page', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.goToAddNewRecipient()
    })
    it('TC_BP_005 - Verify that "Add New Recipient" button under Seach Bar naviagtes to Recipient Details Page', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
        batchPayments.fxrateChecker()
    })
    it('TC_BP_006 - Verify that user navigates to Payment Summary page', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
    })
    it('TC_BP_007 - Verify that Funding Method (Easy Transfer and Push Funds) is not available for currencies other than GBP and Euro', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
        batchPayments.disabledFundingMethod()
    })
    xit('TC_BP_009 - Verify that Yapily flow journey and transaction is completed', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_010 - Verify that user can view payment after paying a recipient', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
        batchPayments.paymentSummaryPageDetails()
        batchPayments.goToViewPayment()
    })
    it('TC_BP_011 - Verify that user can pay new payment right after paying a recipient', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
        batchPayments.paymentSummaryPageDetails()
        batchPayments.goToNewPayment()
    })
    it('TC_BP_012 - Verify that after paying recipients, user is able to return to the payment dashboard.', function(){
        paymentspage.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.validateSearchBar()
        batchPayments.addRecipientDetails()
        batchPayments.paymentSummaryPageDetails()
        batchPayments.goToDashboard()
    })


    // Carmen Casses for batch payment
    // individual recipients
    // push fund
    it('TC_BP_013 - Add 2 recipients(individual) from the "Add Recipient" page with country = United Arab Emirates and currency = AED. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL AED PF',lName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL AED PF',lName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL AED PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL AED PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_014 - Add 2 recipients(individual) from the "Add Recipient" page with country = India and currency = INR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email)
        newRecipient.addIndiaBankDetail()
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL INR PF',lName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email1)
        newRecipient.addIndiaBankDetail()
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL INR PF',lName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL INR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL INR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        batchPayments.iNRDetails()
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.iNRDetails1()
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_015 - Add 2 recipients(individual) from the "Add Recipient" page with country = CHINA and currency = CNY. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'CNY{enter}' ,email)
        newRecipient.addBankDetailsChina('AYCLCNBY','55555555','501100000011')
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('INDIVIDUAL CNY PF'+' '+bName,'CHINA{enter}')
        //batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })

        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'CNY{enter}' ,email1)
        newRecipient.addBankDetailsChina('AYCLCNBY','55555555','501100000011')
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('INDIVIDUAL CNY PF'+ ' '+bName1,'CHINA{enter}')
        //batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
    
        let name= 'INDIVIDUAL CNY PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL CNY PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
        //Validate Purpose on batch payment
        cy.get('.ant-select-selector').eq(1).click()
        cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList').then(purposeList=>{
                expect(list).to.eq(purposeList)
                cy.get('.ant-select-selector').eq(1).click()
            })
        })
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(5).click()
        cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList1').then(purposeList1=>{
                expect(list).to.eq(purposeList1)
                cy.get('.ant-select-selector').eq(5).click()
            })
        })

        let amount = '260'
        batchPayments.addrecipientDetail(amount, email)
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        let amount1= 265
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)

    })
    it('TC_BP_016 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED KINGDOM and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL EUR PF',lName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL EUR PF',lName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL EUR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL EUR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()       
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_017 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED KINGDOM and currency = GBP. After adding, make a batch payment to these recipients using EUR and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        batchPayments.validateAccSortNo()
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL GBP PF',lName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        batchPayments.validateAccSortNo()
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL GBP PF',lName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL GBP PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL GBP PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowGBP('{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    // Easy Transfer
    it('TC_BP_018 - Add 2 recipients(individual) from the "Add Recipient" page with country = United Arab Emirates and currency = AED. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL AED ET',lName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL AED ET',lName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL AED ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL AED ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_019 - Add 2 recipients(individual) from the "Add Recipient" page with country = India and currency = INR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email)
        newRecipient.addIndiaBankDetail()
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL INR ET',lName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email1)
        newRecipient.addIndiaBankDetail()
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL INR ET',lName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL INR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL INR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
             //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        batchPayments.iNRDetails()
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.iNRDetails1()
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_020 - Add 2 recipients(individual) from the "Add Recipient" page with country = CHINA and currency = CNY. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'CNY{enter}' ,email)
        newRecipient.addBankDetailsChina('AYCLCNBY','55555555','501100000011')
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('INDIVIDUAL CNY ET'+' '+bName,'CHINA{enter}')
        //batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })

        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'CNY{enter}' ,email1)
        newRecipient.addBankDetailsChina('AYCLCNBY','55555555','501100000011')
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('INDIVIDUAL CNY ET'+ ' '+bName1,'CHINA{enter}')
        //batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
       
        let name= 'INDIVIDUAL CNY ET'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL CNY ET'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
        //Validate Purpose on batch payment
        cy.get('.ant-select-selector').eq(1).click()
        cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList').then(purposeList=>{
                expect(list).to.eq(purposeList)
                cy.get('.ant-select-selector').eq(1).click()
            })
        })
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(5).click()
        cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList1').then(purposeList1=>{
                expect(list).to.eq(purposeList1)
                cy.get('.ant-select-selector').eq(5).click()
            })
        })

        let amount = '260'
        batchPayments.addrecipientDetail(amount, email)
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        let amount1= 265
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_021 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED KINGDOM and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL EUR ET',lName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL EUR ET',lName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL EUR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL EUR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_022 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED KINGDOM and currency = GBP. After adding, make a batch payment to these recipients using EUR and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        batchPayments.validateAccSortNo()
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL GBP ET',lName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        batchPayments.validateAccSortNo()
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL GBP ET',lName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL GBP ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL GBP ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowGBP('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //Business recipient
    // Push Fund
    it('TC_BP_023 - Add 2 recipients(business) from the "Add Recipient" page with country = United Arab Emirates and currency = AED. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS AED PF'+' '+bName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS AED PF'+ ' '+bName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS AED PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS AED PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_024 - Add 2 recipients(business) from the "Add Recipient" page with country = India and currency = INR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email)
        newRecipient.addIndiaBankDetail()
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS INR PF'+' '+bName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email1)
        newRecipient.addIndiaBankDetail()
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS INR PF'+ ' '+bName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS INR PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS INR PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
             //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        batchPayments.iNRDetails()
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.iNRDetails1()
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_025 - Add 2 recipients(business) from the "Add Recipient" page with country = UNITED KINGDOM and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS EUR PF'+' '+bName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS EUR PF'+ ' '+bName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS EUR PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS EUR PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_026 - Add 2 recipients(business) from the "Add Recipient" page with country = UNITED KINGDOM and currency = GBP. After adding, make a batch payment to these recipients using EUR and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        batchPayments.validateAccSortNo()
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUsINESS GBP PF'+' '+bName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        batchPayments.validateAccSortNo()
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GBP PF'+ ' '+bName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS GBP PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS GBP PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowGBP('{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
        //Easy Transfer
    it('TC_BP_027 - Add 2 recipients(business) from the "Add Recipient" page with country = United Arab Emirates and currency = AED. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email)
            newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS AED ET'+' '+bName,'UNITED ARAB EMIRATES{enter}')
            batchPayments.paymentPurpose()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            newRecipient.checkSettelment('be.disabled','be.enabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'AED{enter}' ,email1)
            newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName1 = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS AED ET'+ ' '+bName1,'UNITED ARAB EMIRATES{enter}')
            batchPayments.paymentPurpose1()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            newRecipient.checkSettelment('be.disabled','be.enabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'BUSINESS AED ET'+' '+ bName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'BUSINESS AED ET'+' ' + bName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(1).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(1).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(5).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(5).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_028 - Add 2 recipients(business) from the "Add Recipient" page with country = India and currency = INR. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email)
            newRecipient.addIndiaBankDetail()
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS INR ET'+' '+bName,'INDIA{downarrow}{enter}')
            batchPayments.paymentPurpose()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            newRecipient.checkSettelment('be.enabled','be.disabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'INR{enter}' ,email1)
            newRecipient.addIndiaBankDetail()
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName1 = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS INR ET'+ ' '+bName1,'INDIA{downarrow}{enter}')
            batchPayments.paymentPurpose1()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            newRecipient.checkSettelment('be.enabled','be.disabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'BUSINESS INR ET'+' '+ bName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'BUSINESS INR ET'+' ' + bName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                 //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(1).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(1).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(5).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(5).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            batchPayments.iNRDetails()
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.iNRDetails1()
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_029 - Add 2 recipients(business) from the "Add Recipient" page with country = UNITED KINGDOM and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email)
            newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS EUR ET'+' '+bName,'UNITED KINGDOM{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.enabled','be.disabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'EUR{enter}' ,email1)
            newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName1 = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS EUR ET'+ ' '+bName1,'UNITED KINGDOM{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.enabled','be.disabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'BUSINESS EUR ET'+' '+ bName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'BUSINESS EUR ET'+' ' + bName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
            let amount1= 260
            batchPayments.addrecipientDetail1EUR(amount1, email1)
            batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_030 - Add 2 recipients(business) from the "Add Recipient" page with country = UNITED KINGDOM and currency = GBP. After adding, make a batch payment to these recipients using EUR and easy transfer', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email)
            newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
            batchPayments.validateAccSortNo()
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS GBP ET'+' '+bName,'UNITED KINGDOM{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.enabled','be.disabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'GBP{enter}' ,email1)
            newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
            batchPayments.validateAccSortNo()
            cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
            const bName1 = batchPayments.generateRandomString(6)
            batchPayments.addBusinessRecipient('BUSINESS GBP ET'+ ' '+bName1,'UNITED KINGDOM{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.enabled','be.disabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'BUSINESS GBP ET'+' '+ bName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'BUSINESS GBP ET'+' ' + bName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
            let amount1= 260
            batchPayments.addrecipientDetail1EUR(amount1, email1)
            batchPayments.proceedflowGBP('{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    // Euro Zone 
    // individual Recipient
    // Push Fund
    it('TC_BP_031 - Add 2 recipients(individual) from the "Add Recipient" page with country = GERMANY and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('GERMANY EUR PF',lName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('GERMANY EUR PF',lName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'GERMANY EUR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'GERMANY EUR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_032 - Add 2 recipients(individual) from the "Add Recipient" page with country = FRANCE and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('FRANCE EUR PF',lName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('FRANCE EUR PF',lName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'FRANCE EUR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'FRANCE EUR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_033 - Add 2 recipients(individual) from the "Add Recipient" page with country = SPAIN and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SPAIN EUR PF',lName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SPAIN EUR PF',lName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'SPAIN EUR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'SPAIN EUR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_034 - Add 2 recipients(individual) from the "Add Recipient" page with country = ITALY and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('Italy EUR PF',lName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('ITALY EUR PF',lName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'ITALY EUR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'ITALY EUR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_035 - Add 2 recipients(individual) from the "Add Recipient" page with country = MALTA and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MALTA EUR PF',lName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MALTA EUR PF',lName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MALTA EUR PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MALTA EUR PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy transfer
    it('TC_BP_036 - Add 2 recipients(individual) from the "Add Recipient" page with country = GERMANY and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('GERMANY EUR ET',lName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
       // newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('GERMANY EUR ET',lName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'GERMANY EUR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'GERMANY EUR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_037 - Add 2 recipients(individual) from the "Add Recipient" page with country = FRANCE and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('FRANCE EUR ET',lName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('FRANCE EUR ET',lName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'FRANCE EUR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'FRANCE EUR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_038 - Add 2 recipients(individual) from the "Add Recipient" page with country = SPAIN and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SPAIN EUR ET',lName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SPAIN EUR ET',lName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'SPAIN EUR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'SPAIN EUR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_039 - Add 2 recipients(individual) from the "Add Recipient" page with country = ITALY and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('Italy EUR ET',lName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('ITALY EUR ET',lName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'ITALY EUR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'ITALY EUR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_040 - Add 2 recipients(individual) from the "Add Recipient" page with country = MALTA and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MALTA EUR ET',lName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MALTA EUR ET',lName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MALTA EUR ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MALTA EUR ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //Business recipient
    //EURO Zone
    // Push Fund
    it('TC_BP_041 - Add 2 recipients(Business) from the "Add Recipient" page with country = GERMANY and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY EUR'+' '+bName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY EUR'+ ' '+bName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS GERMANY EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS GERMANY EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_042 - Add 2 recipients(Business) from the "Add Recipient" page with country = FRANCE and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE EUR'+' '+bName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE EUR'+ ' '+bName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS FRANCE EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS FRANCE EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_043 - Add 2 recipients(Business) from the "Add Recipient" page with country = SPAIN and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN EUR'+' '+bName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN EUR'+ ' '+bName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS SPAIN EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS SPAIN EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_044 - Add 2 recipients(Business) from the "Add Recipient" page with country = ITALY and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY EUR'+' '+bName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY EUR'+ ' '+bName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS ITALY EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS ITALY EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_045 - Add 2 recipients(BUSINESS) from the "Add Recipient" page with country = MALTA and currency = EUR. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA EUR'+' '+bName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA EUR'+ ' '+bName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MALTA EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MALTA EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy transfer
    it('TC_BP_046 - Add 2 recipients(Business) from the "Add Recipient" page with country = GERMANY and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY EUR'+' '+bName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
       // newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY EUR'+ ' '+bName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS GERMANY EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS GERMANY EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_047 - Add 2 recipients(Business) from the "Add Recipient" page with country = FRANCE and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE EUR'+' '+bName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE EUR'+ ' '+bName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS FRANCE EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS FRANCE EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_048 - Add 2 recipients(Business) from the "Add Recipient" page with country = SPAIN and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN EUR'+' '+bName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN EUR'+ ' '+bName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS SPAIN EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS SPAIN EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_049 - Add 2 recipients(Business) from the "Add Recipient" page with country = ITALY and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY EUR'+' '+bName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY EUR'+ ' '+bName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS ITALY EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS ITALY EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_050 - Add 2 recipients(Business) from the "Add Recipient" page with country = MALTA and currency = EUR. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA EUR'+' '+bName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'EUR{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA EUR'+ ' '+bName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MALTA EUR'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MALTA EUR'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflowEUR('{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //push fund individual other countries
    it('TC_BP_051 - Add 2 recipients(individual) from the "Add Recipient" page with country = AUSTRALIA and currency = AUD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('AUSTRALIA AUD PF',lName,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email1)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('AUSTRALIA AUD PF',lName1,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'AUSTRALIA AUD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'AUSTRALIA AUD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_052 - Add 2 recipients(individual) from the "Add Recipient" page with country = CANADA and currency = CAD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('CANADA CAD PF',lName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email1)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('CANADA CAD PF',lName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'CANADA CAD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'CANADA CAD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_053 - Add 2 recipients(individual) from the "Add Recipient" page with country = SINGAPORE and currency = SGD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SINGAPORE SGD PF',lName,'SINGAPORE{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SINGAPORE SGD PF',lName1,'SINGAPORE{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'SINGAPORE SGD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'SINGAPORE SGD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_054 - Add 2 recipients(individual) from the "Add Recipient" page with country = HONG KONG and currency = HKD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG HKD PF',lName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email1)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG HKD PF',lName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'HONG KONG HKD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'HONG KONG HKD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_055 - Add 2 recipients(individual) from the "Add Recipient" page with country = MEXICO and currency = MXN. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO MXN PF',lName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO MXN PF',lName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MEXICO MXN PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MEXICO MXN PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer individual other countries
    it('TC_BP_056 - Add 2 recipients(individual) from the "Add Recipient" page with country = AUSTRALIA and currency = AUD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('AUSTRALIA AUD ET',lName,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email1)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('AUSTRALIA AUD ET',lName1,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'AUSTRALIA AUD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'AUSTRALIA AUD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_057 - Add 2 recipients(individual) from the "Add Recipient" page with country = CANADA and currency = CAD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('CANADA CAD ET',lName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email1)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('CANADA CAD ET',lName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'CANADA CAD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'CANADA CAD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_058 - Add 2 recipients(individual) from the "Add Recipient" page with country = SINGAPORE and currency = SGD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SINGAPORE SGD ET',lName,'SINGAPORE{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SINGAPORE SGD ET',lName1,'SINGAPORE{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'SINGAPORE SGD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'SINGAPORE SGD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_059 - Add 2 recipients(individual) from the "Add Recipient" page with country = HONG KONG and currency = HKD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG HKD ET',lName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email1)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG HKD ET',lName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'HONG KONG HKD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'HONG KONG HKD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_060 - Add 2 recipients(individual) from the "Add Recipient" page with country = MEXICO and currency = MXN. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO MXN ET',lName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO MXN ET',lName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MEXICO MXN ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MEXICO MXN ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //push fund business other countries
    it('TC_BP_061 - Add 2 recipients(business) from the "Add Recipient" page with country = AUSTRALIA and currency = AUD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS AUSTRALIA'+' '+bName,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email1)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS AUSTRALIA'+ ' '+bName1,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS AUSTRALIA'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS AUSTRALIA'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_062 - Add 2 recipients(business) from the "Add Recipient" page with country = CANADA and currency = CAD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS CANADA'+' '+bName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email1)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS CANADA'+ ' '+bName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS CANADA'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS CANADA'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_063 - Add 2 recipients(business) from the "Add Recipient" page with country = SINGAPORE and currency = SGD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SINGAPORE'+' '+bName,'SINGAPORE{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SINGAPORE'+ ' '+bName1,'SINGAPORE{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS SINGAPORE'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS SINGAPORE'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_064 - Add 2 recipients(business) from the "Add Recipient" page with country = HONG KONG and currency = HKD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG'+' '+bName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email1)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG'+ ' '+bName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS HONG KONG'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS HONG KONG'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_065 - Add 2 recipients(business) from the "Add Recipient" page with country = MEXICO and currency = MXN. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO'+' '+bName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO'+ ' '+bName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MEXICO'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MEXICO'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer BUSINESS other countries
    it('TC_BP_066 - Add 2 recipients(business) from the "Add Recipient" page with country = AUSTRALIA and currency = AUD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS AUSTRALIA'+' '+bName,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'AUD{enter}' ,email1)
        batchPayments.addBankDetailAUS('ABNAAU2BXXX','123456789','939200')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS AUSTRALIA'+ ' '+bName1,'AUSTRALIA{enter}')
        cy.get('#postcode').type('54000')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS AUSTRALIA'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS AUSTRALIA'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_067 - Add 2 recipients(business) from the "Add Recipient" page with country = CANADA and currency = CAD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS CANADA'+' '+bName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'CAD{enter}' ,email1)
        batchPayments.addBankDetailCAD('BNDCCAMMXXX','26207729','004','01372')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS CANADA'+ ' '+bName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS CANADA'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS CANADA'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_068 - Add 2 recipients(business) from the "Add Recipient" page with country = SINGAPORE and currency = SGD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SINGAPORE'+' '+bName,'SINGAPORE{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'SGD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ACLPSGSG','049712')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SINGAPORE'+ ' '+bName1,'SINGAPORE{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS SINGAPORE'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS SINGAPORE'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_069 - Add 2 recipients(business) from the "Add Recipient" page with country = HONG KONG and currency = HKD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG'+' '+bName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'HKD{enter}' ,email1)
        batchPayments.addBankDetailHKD('HSBCHKHH','1234657890','004')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG'+ ' '+bName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS HONG KONG'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS HONG KONG'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_070 - Add 2 recipients(business) from the "Add Recipient" page with country = MEXICO and currency = MXN. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO'+' '+bName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'MXN{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO'+ ' '+bName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MEXICO'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MEXICO'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    // Euro Zone With USD
    //individual Recipient
    // Push Fund
    it('TC_BP_071 - Add 2 recipients(individual) from the "Add Recipient" page with country = GERMANY and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('GERMANY USD PF',lName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('GERMANY USD PF',lName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'GERMANY USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.get(5000)
        let name1 = 'GERMANY USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
         let amount = '250'
         batchPayments.addrecipientDetail(amount, email)
         let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_072 - Add 2 recipients(individual) from the "Add Recipient" page with country = FRANCE and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('FRANCE USD PF',lName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('FRANCE USD PF',lName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'FRANCE USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'FRANCE USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_073 - Add 2 recipients(individual) from the "Add Recipient" page with country = SPAIN and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SPAIN USD PF',lName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('SPAIN USD PF',lName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'SPAIN USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'SPAIN USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_074 - Add 2 recipients(individual) from the "Add Recipient" page with country = ITALY and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('Italy USD PF',lName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('ITALY USD PF',lName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'ITALY USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'ITALY USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_075 - Add 2 recipients(individual) from the "Add Recipient" page with country = MALTA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MALTA USD PF',lName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MALTA USD PF',lName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MALTA USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MALTA USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy transfer
    it('TC_BP_076 - Add 2 recipients(individual) from the "Add Recipient" page with country = GERMANY and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email)
            newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
            const lName = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('GERMANY USD ET',lName,'GERMANY{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
           // newRecipient.checkSettelment('be.disabled','be.enabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email1)
            newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
            const lName1 = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('GERMANY USD ET',lName1,'GERMANY{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'GERMANY USD ET'+' '+ lName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'GERMANY USD ET'+' ' + lName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_077 - Add 2 recipients(individual) from the "Add Recipient" page with country = FRANCE and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email)
            newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
            const lName = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('FRANCE USD ET',lName,'FRANCE{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email1)
            newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
            const lName1 = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('FRANCE USD ET',lName1,'FRANCE{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'FRANCE USD ET'+' '+ lName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'FRANCE USD ET'+' ' + lName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_078 - Add 2 recipients(individual) from the "Add Recipient" page with country = SPAIN and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email)
            newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
            const lName = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('SPAIN USD ET',lName,'SPAIN{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email1)
            newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
            const lName1 = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('SPAIN USD ET',lName1,'SPAIN{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'SPAIN USD ET'+' '+ lName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'SPAIN USD ET'+' ' + lName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_079 - Add 2 recipients(individual) from the "Add Recipient" page with country = ITALY and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email)
            newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
            const lName = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('Italy USD ET',lName,'ITALY{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email1)
            newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
            const lName1 = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('ITALY USD ET',lName1,'ITALY{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'ITALY USD ET'+' '+ lName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'ITALY USD ET'+' ' + lName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    it('TC_BP_080 - Add 2 recipients(individual) from the "Add Recipient" page with country = MALTA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
            newRecipient.goToPaymentsDashborad()
            newRecipient.gotoRecipientList()
            let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email)
            newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
            const lName = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('MALTA USD ET',lName,'MALTA{enter}')
            batchPayments.paymentPurposeGBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList = Element.text()
                cy.log(purposeList)
                cy.wrap(purposeList).as('purposeList')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            newRecipient.gotoRecipientList()
            let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
            batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email1)
            newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
            const lName1 = batchPayments.generateRandomString(6)
            batchPayments.individualRecipient('MALTA USD ET',lName1,'MALTA{enter}')
            batchPayments.paymentPurpose1GBPEUR()
            cy.get('.ant-select-selector').eq(3).click()
            cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
                let purposeList1 = Element.text()
                cy.log(purposeList1)
                cy.wrap(purposeList1).as('purposeList1')
            })
            newRecipient.saveRecipient()
            //newRecipient.checkSettelment('be.disabled','be.enabled')
            cy.reload()
            batchPayments.goToBatchPaymentPage()
            batchPayments.goToPayMultipleRecipient()
            let name= 'MALTA USD ET'+' '+ lName+'{enter}'
            batchPayments.validateSearchBar(name)
            cy.wait(5000)
            let name1 = 'MALTA USD ET'+' ' + lName1+'{enter}'
            batchPayments.validateSearchBar(name1)
                //Validate Purpose on batch payment
                cy.get('.ant-select-selector').eq(2).click()
                cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList').then(purposeList=>{
                        expect(list).to.eq(purposeList)
                        cy.get('.ant-select-selector').eq(2).click()
                    })
                })
                cy.wait(1000)
                cy.get('.ant-select-selector').eq(6).click()
                cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                    let list = Element.text()
                    cy.log(list)
                    cy.get('@purposeList1').then(purposeList1=>{
                        expect(list).to.eq(purposeList1)
                        cy.get('.ant-select-selector').eq(6).click()
                    })
                })
            let amount = '250'
            batchPayments.addrecipientDetail(amount, email)
            let amount1= 260
            batchPayments.addrecipientDetail1(amount1, email1)
            batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
            batchPayments.validateproceedflow(amount,amount1)
            batchPayments.validateYapilyFlow()
    })
    //Business recipient
    //EURO Zone USD
    // Push Fund
    it('TC_BP_081 - Add 2 recipients(Business) from the "Add Recipient" page with country = GERMANY and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY USD'+' '+bName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY USD'+ ' '+bName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS GERMANY USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS GERMANY USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_082 - Add 2 recipients(Business) from the "Add Recipient" page with country = FRANCE and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE USD'+' '+bName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE USD'+ ' '+bName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS FRANCE USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS FRANCE USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_083 - Add 2 recipients(Business) from the "Add Recipient" page with country = SPAIN and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN USD'+' '+bName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN USD'+ ' '+bName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS SPAIN USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS SPAIN USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_084 - Add 2 recipients(Business) from the "Add Recipient" page with country = ITALY and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY USD'+' '+bName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY USD'+ ' '+bName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS ITALY USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS ITALY USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_085 - Add 2 recipients(BUSINESS) from the "Add Recipient" page with country = MALTA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA USD'+' '+bName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA USD'+ ' '+bName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MALTA USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MALTA USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy transfer
    it('TC_BP_086 - Add 2 recipients(Business) from the "Add Recipient" page with country = GERMANY and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY USD'+' '+bName,'GERMANY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
       // newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('GERMANY{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('DE40500105171359375129','AARBDE5W100')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS GERMANY USD'+ ' '+bName1,'GERMANY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS GERMANY USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS GERMANY USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_087 - Add 2 recipients(Business) from the "Add Recipient" page with country = FRANCE and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE USD'+' '+bName,'FRANCE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('FRANCE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('FR1420041010050500013M02606','GASKFRPPXXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS FRANCE USD'+ ' '+bName1,'FRANCE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS FRANCE USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS FRANCE USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_088 - Add 2 recipients(Business) from the "Add Recipient" page with country = SPAIN and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN USD'+' '+bName,'SPAIN{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SPAIN{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('ES9121000418450200051332','CAGLESMMCOP')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS SPAIN USD'+ ' '+bName1,'SPAIN{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS SPAIN USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS SPAIN USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_089 - Add 2 recipients(Business) from the "Add Recipient" page with country = ITALY and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY USD'+' '+bName,'ITALY{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('ITALY{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('IT60X0542811101000000123456','FCRRITM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS ITALY USD'+ ' '+bName1,'ITALY{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS ITALY USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS ITALY USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_090 - Add 2 recipients(Business) from the "Add Recipient" page with country = MALTA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA USD'+' '+bName,'MALTA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MALTA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('MT84MALT011000012345MTLCAST001S','IESCMTM1XXX')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MALTA USD'+ ' '+bName1,'MALTA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MALTA USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MALTA USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //United State with USD
    //push fund
    it('TC_BP_091 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED STATES and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('UNITED STATES USD PF',lName,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('UNITED STATES USD PF',lName1,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'UNITED STATES USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.get(5000)
        let name1 = 'UNITED STATES USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
         let amount = '250'
         batchPayments.addrecipientDetail(amount, email)
         cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_092 - Add 2 recipients(Business) from the "Add Recipient" page with country = UNITED STATES and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS UNITED STATES USD'+' '+bName,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS UNITED STATES USD'+ ' '+bName1,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS UNITED STATES USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS UNITED STATES USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer
    it('TC_BP_093 - Add 2 recipients(individual) from the "Add Recipient" page with country = GERMANY and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('UNITED STATES USD ET',lName,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
       // newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('UNITED STATES USD ET',lName1,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'UNITED STATES USD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'UNITED STATES USD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_094 - Add 2 recipients(Business) from the "Add Recipient" page with country = UNITED STATES and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS UNITED STATES USD'+' '+bName,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
       // newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED STATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('MMMCUS44','55555555')
        cy.get('#aba').type('026009593')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS UNITED STATES USD'+ ' '+bName1,'UNITED STATES{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS UNITED STATES USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS UNITED STATES USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        cy.get('[class="ant-btn ant-btn-primary ant-btn-background-ghost"]').eq(0).should('be.visible').click()
        let amount1= 260
        batchPayments.addrecipientDetail1EUR(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //UNITED KINGDOM with USD
    //push fund
    it('TC_BP_095 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED KINGDOM and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()       
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_096 - Add 2 recipients(business) from the "Add Recipient" page with country = UNITED KINGDOM and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer
    it('TC_BP_097 - Add 2 recipients(individual) from the "Add Recipient" page with country = UNITED KINGDOM and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD ET',lName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD ET',lName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_098 - Add 2 recipients(business) from the "Add Recipient" page with country = UNITED KINGDOM and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD ET'+' '+bName,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED KINGDOM{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('GB73BARC20039538243547','AFFLGB22')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD ET'+ ' '+bName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD ET'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD ET'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //China with USD
    //push fund
    it('TC_BP_099 - Add 2 recipients(individual) from the "Add Recipient" page with country = CHINA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'CHINA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })

        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'CHINA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
       
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
        //Validate Purpose on batch payment
        cy.get('.ant-select-selector').eq(2).click()
        cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList').then(purposeList=>{
                expect(list).to.eq(purposeList)
                cy.get('.ant-select-selector').eq(2).click()
            })
        })
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(6).click()
        cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList1').then(purposeList1=>{
                expect(list).to.eq(purposeList1)
                cy.get('.ant-select-selector').eq(6).click()
            })
        })

        let amount = '260'
        batchPayments.addrecipientDetail(amount, email)
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        let amount1= 265
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_100 - Add 2 recipients(business) from the "Add Recipient" page with country = CHINA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD ET'+' '+bName,'CHINA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })

        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD ET'+ ' '+bName1,'CHINA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
       
        let name= 'BUSINESS USD ET'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD ET'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
        //Validate Purpose on batch payment
        cy.get('.ant-select-selector').eq(2).click()
        cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList').then(purposeList=>{
                expect(list).to.eq(purposeList)
                cy.get('.ant-select-selector').eq(2).click()
            })
        })
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(6).click()
        cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList1').then(purposeList1=>{
                expect(list).to.eq(purposeList1)
                cy.get('.ant-select-selector').eq(6).click()
            })
        })

        let amount = '260'
        batchPayments.addrecipientDetail(amount, email)
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        let amount1= 265
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer
    it('TC_BP_101 - Add 2 recipients(individual) from the "Add Recipient" page with country = CHINA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'CHINA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })

        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'CHINA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
       
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
        //Validate Purpose on batch payment
        cy.get('.ant-select-selector').eq(2).click()
        cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList').then(purposeList=>{
                expect(list).to.eq(purposeList)
                cy.get('.ant-select-selector').eq(2).click()
            })
        })
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(6).click()
        cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList1').then(purposeList1=>{
                expect(list).to.eq(purposeList1)
                cy.get('.ant-select-selector').eq(6).click()
            })
        })

        let amount = '260'
        batchPayments.addrecipientDetail(amount, email)
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        let amount1= 265
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_102 - Add 2 recipients(business) from the "Add Recipient" page with country = CHINA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD ET'+' '+bName,'CHINA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })

        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CHINA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('AYCLCNBY','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD ET'+ ' '+bName1,'UNITED KINGDOM{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
       
        let name= 'BUSINESS USD ET'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD ET'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
        //Validate Purpose on batch payment
        cy.get('.ant-select-selector').eq(2).click()
        cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList').then(purposeList=>{
                expect(list).to.eq(purposeList)
                cy.get('.ant-select-selector').eq(2).click()
            })
        })
        cy.wait(1000)
        cy.get('.ant-select-selector').eq(6).click()
        cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
            let list = Element.text()
            cy.log(list)
            cy.get('@purposeList1').then(purposeList1=>{
                expect(list).to.eq(purposeList1)
                cy.get('.ant-select-selector').eq(6).click()
            })
        })

        let amount = '260'
        batchPayments.addrecipientDetail(amount, email)
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        let amount1= 265
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //INDIA with USD
    //push fund
    it('TC_BP_103 - Add 2 recipients(individual) from the "Add Recipient" page with country = India and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
             //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_104 - Add 2 recipients(business) from the "Add Recipient" page with country = India and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
             //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer
    it('TC_BP_105 - Add 2 recipients(individual) from the "Add Recipient" page with country = India and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
             //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_106 - Add 2 recipients(business) from the "Add Recipient" page with country = India and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('INDIA{downarrow}{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('IDIBINBBXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'INDIA{downarrow}{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.enabled','be.disabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
             //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //UNITED ARAB EMIRATES with USD
    //push fund
    it('TC_BP_107 - Add 2 recipients(individual) from the "Add Recipient" page with country = United Arab Emirates and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1AEDUSD(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_108 - Add 2 recipients(business) from the "Add Recipient" page with country = United Arab Emirates and currency = AED. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1AEDUSD(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //Easy Transfer
    it('TC_BP_109 - Add 2 recipients(individual) from the "Add Recipient" page with country = United Arab Emirates and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1AEDUSD(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_110 - Add 2 recipients(business) from the "Add Recipient" page with country = United Arab Emirates and currency = AED. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('UNITED ARAB EMIRATES{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetails('AE070331234567890123456','AARPAEAA')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'UNITED ARAB EMIRATES{enter}')
        batchPayments.paymentPurpose1()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(1).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(1).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(5).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(5).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1AEDUSD(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //AUSTRALIA with USD
    //push fund
    it('TC_BP_111 - Add 2 recipients(individual) from the "Add Recipient" page with country = AUSTRALIA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'AUSTRALIA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'AUSTRALIA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_112 - Add 2 recipients(business) from the "Add Recipient" page with country = AUSTRALIA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'AUSTRALIA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'AUSTRALIA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //easy transfer
    it('TC_BP_113 - Add 2 recipients(individual) from the "Add Recipient" page with country = AUSTRALIA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'AUSTRALIA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'AUSTRALIA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_114 - Add 2 recipients(business) from the "Add Recipient" page with country = AUSTRALIA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'AUSTRALIA{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('AUSTRALIA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ABNAAU2BOBU','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'AUSTRALIA{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //CANADA with USD
    //push fund
    it('TC_BP_115 - Add 2 recipients(individual) from the "Add Recipient" page with country = CANADA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_116 - Add 2 recipients(business) from the "Add Recipient" page with country = CANADA and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //easy transfer
    it('TC_BP_117 - Add 2 recipients(individual) from the "Add Recipient" page with country = CANADA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_118 - Add 2 recipients(business) from the "Add Recipient" page with country = CANADA and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('CANADA{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('ROYCCAT2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'CANADA{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName
        batchPayments.validateSearchBar(name+'{enter}')
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1
        batchPayments.validateSearchBar(name1+'{enter}')
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)   
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //SINGAPORE with USD
    //push fund
    it('TC_BP_119 - Add 2 recipients(individual) from the "Add Recipient" page with country = SINGAPORE and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'SINGAPORE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'SINGAPORE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_120 - Add 2 recipients(business) from the "Add Recipient" page with country = SINGAPORE and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'SINGAPORE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'SINGAPORE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //easy transfer
    it('TC_BP_121 - Add 2 recipients(individual) from the "Add Recipient" page with country = SINGAPORE and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName,'SINGAPORE{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('INDIVIDUAL USD PF',lName1,'SINGAPORE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'INDIVIDUAL USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'INDIVIDUAL USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_122 - Add 2 recipients(business) from the "Add Recipient" page with country = SINGAPORE and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+' '+bName,'SINGAPORE{enter}')                             
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('SINGAPORE{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCSGS2','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS USD PF'+ ' '+bName1,'SINGAPORE{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS USD PF'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS USD PF'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)                  
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'    
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //HONG KONG with USD
    //push fund
    it('TC_BP_123 - Add 2 recipients(individual) from the "Add Recipient" page with country = HONG KONG and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG USD PF',lName,'HONG KONG{enter}')
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG USD PF',lName1,'HONG KONG{enter}')
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'HONG KONG USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'HONG KONG USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_124 - Add 2 recipients(business) from the "Add Recipient" page with country = HONG KONG and currency = HKD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG USD'+' '+bName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG USD'+ ' '+bName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS HONG KONG USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS HONG KONG USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    //easy transfer
    it('TC_BP_125 - Add 2 recipients(individual) from the "Add Recipient" page with country = HONG KONG and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG USD ET',lName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('HONG KONG USD ET',lName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'HONG KONG USD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'HONG KONG USD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_126 - Add 2 recipients(business) from the "Add Recipient" page with country = HONG KONG and currency = HKD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG USD'+' '+bName,'HONG KONG{enter}')
        
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('HONG KONG{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithAccNo('HSBCHKHHXXX','55555555')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS HONG KONG USD'+ ' '+bName1,'HONG KONG{enter}')
       
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()             
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')                                                            
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS HONG KONG USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS HONG KONG USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //MEXICO with USD
    //push fund
    it('TC_BP_127 - Add 2 recipients(individual) from the "Add Recipient" page with country = MEXICO and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO USD PF',lName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO USD PF',lName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MEXICO USD PF'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MEXICO USD PF'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_128 - Add 2 recipients(individual) from the "Add Recipient" page with country = MEXICO and currency = USD. After adding, make a batch payment to these recipients using GBP and easy transfer', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO USD ET',lName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        const lName1 = batchPayments.generateRandomString(6)
        batchPayments.individualRecipient('MEXICO USD ET',lName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'MEXICO USD ET'+' '+ lName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'MEXICO USD ET'+' ' + lName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    //easy transfer
    it('TC_BP_129 - Add 2 recipients(business) from the "Add Recipient" page with country = MEXICO and currency = USD. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO USD'+' '+bName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO USD'+ ' '+bName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MEXICO USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MEXICO USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{downarrow}{enter}','Push Fund')
        batchPayments.validateproceedflow(amount,amount1)
    })
    it('TC_BP_130 - Add 2 recipients(business) from the "Add Recipient" page with country = MEXICO and currency = MXN. After adding, make a batch payment to these recipients using GBP and push funds.', function(){
        newRecipient.goToPaymentsDashborad()
        newRecipient.gotoRecipientList()
        let email = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO USD'+' '+bName,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurposeGBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList = Element.text()
            cy.log(purposeList)
            cy.wrap(purposeList).as('purposeList')
        }) 
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        newRecipient.gotoRecipientList()
        let email1 = batchPayments.generateRandomString(5)+ '@yopmail.com'
        batchPayments.addRecipient('MEXICO{enter}' ,'USD{enter}' ,email1)
        newRecipient.addBankDetailsWithClabe('AFIRMXMT','002010077777777771')
        cy.get('.ant-space > :nth-child(2) > .ant-card > .ant-card-body').should('be.visible').click()
        const bName1 = batchPayments.generateRandomString(6)
        batchPayments.addBusinessRecipient('BUSINESS MEXICO USD'+ ' '+bName1,'MEXICO{enter}')
        newRecipient.postCodeState()
        batchPayments.paymentPurpose1GBPEUR()
        cy.get('.ant-select-selector').eq(3).click()
        cy.get('.ant-select-dropdown').eq(3).find('.ant-select-item-option-content').then(Element=>{
            let purposeList1 = Element.text()
            cy.log(purposeList1)
            cy.wrap(purposeList1).as('purposeList1')
        })
        newRecipient.saveRecipient()
        //newRecipient.checkSettelment('be.disabled','be.enabled')
        cy.reload()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        let name= 'BUSINESS MEXICO USD'+' '+ bName+'{enter}'
        batchPayments.validateSearchBar(name)
        cy.wait(5000)
        let name1 = 'BUSINESS MEXICO USD'+' ' + bName1+'{enter}'
        batchPayments.validateSearchBar(name1)
            //Validate Purpose on batch payment
            cy.get('.ant-select-selector').eq(2).click()
            cy.get('.ant-select-dropdown').eq(1).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList').then(purposeList=>{
                    expect(list).to.eq(purposeList)
                    cy.get('.ant-select-selector').eq(2).click()
                })
            })
            cy.wait(1000)
            cy.get('.ant-select-selector').eq(6).click()
            cy.get('.ant-select-dropdown').eq(2).find('.ant-select-item-option-content').then(Element=>{
                let list = Element.text()
                cy.log(list)
                cy.get('@purposeList1').then(purposeList1=>{
                    expect(list).to.eq(purposeList1)
                    cy.get('.ant-select-selector').eq(6).click()
                })
            })
        let amount = '250'
        batchPayments.addrecipientDetail(amount, email)
        let amount1= 260
        batchPayments.addrecipientDetail1MXN(amount1, email1)
        batchPayments.proceedflow('{downarrow}{enter}','GBP','{downarrow}{enter}','Easy Transfer')
        batchPayments.validateproceedflow(amount,amount1)
        batchPayments.validateYapilyFlow()
    })
    it('TC_BP_131 - Verify that user is able to add Individual recipient through batch payment page', function(){
        newRecipient.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.goToAddNewRecipient()
        batchPayments.addIndvidualRecipientFromBatch()  
    })
    it('TC_BP_132 - Verify that user is able to add Business recipient through batch payment page', function(){
        newRecipient.goToPaymentsDashborad()
        batchPayments.goToBatchPaymentPage()
        batchPayments.goToPayMultipleRecipient()
        batchPayments.goToAddNewRecipient()
        batchPayments.addBusinessRecipientFromBatch()
        
    })
})