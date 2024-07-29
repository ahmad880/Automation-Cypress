export class CardDashboard
{
    vlidateMainPageHeading(){
        cy.get('.ant-col-xs-21 > .fs-18px').should('contain.text','Cards Dashboard')
    }
    validateCardtotalBalance(){
        cy.wait(5000)
        cy.get('[class="ant-typography  bold fs-28px"]').eq(0).then((value1)=>{
         let Total=value1.text().trim()
        Total = Total.replace(/,/g, '').replace("€", "").replace(/&nbsp;/g, '');
        cy.log(Total)
       let wbalance, cbalance
        cy.wait(2000)
        cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px"]').eq(1).then((ele)=>{
         wbalance= ele.text().trim()
         wbalance = wbalance.replace(/,/g, '').replace("€", "");
         cy.log(wbalance)
         cy.wait(2000)
         cy.get('div[class="ant-col"] [class="ant-typography  bold fs-28px pointer').then((ele1)=>{
           cy.log(ele1)
           cbalance=ele1.text().trim()
           cbalance = cbalance.replace(/,/g, '').replace("€", "");
           cy.log(cbalance)
           const  value =(parseFloat(wbalance)+parseFloat(cbalance)).toFixed(2);
           cy.log('Total value:', value);
           cy.log(Total)
           cy.wrap(parseFloat(value)).should('eq', parseFloat(Total));
        })
        })
        })
    }
    validateAllContentOnDashbordPage(){
        cy.get('.ant-typography.light-green.medium.fs-28px').should('contain.text','Total Company Balance')
        cy.get("span[class='ant-typography dark-green medium fs-28px']").should('contain.text','Wallet Balance')
        cy.get('.ant-typography.dark-green.medium.fs-28px.pointer').should('contain.text','Cards Balance')
        cy.get('.slick-slide.slick-active.slick-current div div div .ant-card.ant-card-bordered.ant-card-hoverable.b-g.center-align-text.hover-no-border')
        .should('contain.text','Convert Balances')
        cy.get('[class="ant-typography muli semi-bold fs-18px"]').eq(1).should('contain.text','Fund Card')
        cy.get('[class="ant-typography muli semi-bold fs-18px"]').eq(2).should('contain.text','Withdraw')
        cy.get('[class="ant-typography dark-green medium fs-25px"]').should('contain.text','Recent Activity - ')
        cy.get('[class="ant-typography fs-25px medium dark-green"]').eq(0).should('contain.text','Frequently Used Cards')
        cy.get('[class="ant-typography fs-25px medium dark-green"]').eq(1).should('contain.text','Card Transaction History')
    }
    goToCardsPage(){
        cy.get('.m-t-10 > .ant-row > .ant-col > .ant-btn').click()
        cy.get('.ant-col-24 > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
    }
    goToSpecificCardPage(){
        cy.get('[data-row-key="2270"] > :nth-child(1) > .ant-card > .ant-card-body').click()
    }
    validateContentOnSpecificCardPage(){
        cy.get('.ant-typography.medium.dark-green.fs-28px').should('contain.text','Manage Specific Card')
        cy.get('.ant-row-top > :nth-child(1)').should('contain.text','Freeze').click()
        cy.get('.ant-typography.muli.semi-bold.fs-18px.dark-green').should('contain.text','CARD FREEZE')
        cy.get("div[class='ant-modal-body'] div:nth-child(1) button:nth-child(1)").click()
        cy.get('.ant-row-top > :nth-child(2)').should('contain.text','Report').click()
        cy.get('.ant-typography.muli.semi-bold.fs-18px.dark-green').should('contain.text','CARD LOST/STOLEN')
        cy.get("div[class='ant-modal-body'] div:nth-child(1) button:nth-child(1)").click()
        cy.get('.ant-row-top > :nth-child(3)').should('contain.text','Cancel').click()
        cy.get('.ant-typography.muli.semi-bold.fs-18px.dark-green').should('contain.text','CANCEL CARD')
        cy.get("div[class='ant-modal-body'] div:nth-child(1) button:nth-child(1)").click()
        cy.get('.ant-row-top > :nth-child(4)').should('contain.text','Fund')
        cy.get('.ant-row-top > :nth-child(5)').should('contain.text','Withdraw')
        cy.get('.ant-row-top > :nth-child(6)').should('contain.text','Convert')
        cy.get('[class="ant-row"] [class="ant-typography fs-25px medium dark-green"]').should('contain.text','Card Auto Fund')
        cy.get('[class="ant-typography fs-25px medium dark-green"]').should('contain.text','Authorised Payment Types')
        cy.get('[class="ant-typography fs-25px medium dark-green"]').should('contain.text','Transaction Limits')
        cy.get('[class="ant-typography fs-25px medium dark-green"]').should('contain.text','Card Balance')
    }
}