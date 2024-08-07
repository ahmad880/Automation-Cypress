/// <reference types= "cypress" />

import { accountingConfiguration } from "../PageObject/PageAction/accountingConfiguration";
import { SigninPage } from "../PageObject/PageAction/SigninPage";

const signin = new SigninPage
const configuration = new accountingConfiguration

describe('Additional Currencies ',function(){

    let userName = 'qwerty_admin_1'
    let password = 'testTest1'
    beforeEach(function(){
        cy.visit('/')
        cy.viewport(1440,1000)
    })
    //cases only for XERO user
    it('TC-AC-001 - Verify that user is able to navigate to accounting configuration page from menu', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
    })
    it('TC-AC-002 - Verify that all content is available on accounting configuration page', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
        configuration.contentValidation()
    })
    it.skip('TC-AC-003 - Verify that user is able to on/off the toggle for bank feed', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
        configuration.bankFeedToggleValidation()
    })
    it.skip('TC-AC-004 - Verify that user is able to on/off the toggle for bank feed', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
        configuration.expenseInformationToggleValidation()
    })
    it.only('TC-AC-005 - Verify that user is able to select all card radio button from configuration page', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
        configuration.allCardRadioButton()
    })


    


})