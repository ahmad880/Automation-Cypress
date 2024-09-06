///<reference types = "Cypress"/>

import { SigninPage } from "../PageObject/PageAction/SigninPage";
import '@testing-library/cypress/add-commands'
const Login = new SigninPage

describe('',function(){
    beforeEach(()=>{
        cy.visit('/')
        cy.viewport(1440,1000)
    })
it('TC_SIN_001 Input: Enter a valid email address and password.',()=>{
    Login.signinflow()
})
xit('TC_SIN_002 Input: Click on the "Forgot Password" link and follow the password recovery process.',()=>{
    Login.forgetPassword()
})
it('TC_SIN_004 Input: Attempt to sign in with empty email and password fields.',()=>{
    Login.required_field()
})
it.only('TC_SIN_004 testing signin with different library.',()=>{
    cy.findByText('Welcome Back!').should('be.visible')
    cy.findByPlaceholderText('Username/email').should('be.visible').type('qwerty_admin_1')
    cy.findByPlaceholderText('Enter Password').should('be.visible').type('testTest1')
    //cy.findby().should('be.enabled').click()
    cy.get('.ant-btn').click()
    
})
})