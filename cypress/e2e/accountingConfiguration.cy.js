/// <reference types= "Cypress" />

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
    it('TC-AC-001 - Verify that user is able to navigate to accounting configuration page from menu', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
    })
    it.only('TC-AC-002 - Verify that all content is available on accounting configuration page', function(){
        signin.Login(userName,password)
        configuration.goToAccountingConfiguration()
        configuration.contentValidation()
    })
    


})