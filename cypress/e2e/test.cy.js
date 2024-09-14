/// <reference types= "Cypress" />

describe('Website Navigation and Validation Test Suite', () => {
    beforeEach(() => {
      // Visit the base URL
      cy.visit('https://www.appen.com/');
      cy.viewport(1440,1000)
    });
  
    function checkLinksAndDropdowns(section) {
        cy.get(section).find('a').each(link => {
          const href = link.prop('href');
          const hasDropdown = link.siblings('.dropdown, .submenu').length > 0;
    
          if (hasDropdown) {
            cy.wrap(link).click();
            cy.log(`Opened dropdown for ${link.text()}`);
            
            cy.wrap(link).siblings('.dropdown a, .submenu a').each(subLink => {
              const subHref = subLink.prop('href');
              if (subHref && !subHref.includes('#')) {
                cy.request({
                  url: subHref,
                  timeout: 60000 // Increased timeout here
                }).then((response) => {
                  if (response.status === 200) {
                    cy.log(`Dropdown link working: ${subHref}`);
                  } else {
                    cy.log(`Dropdown link failed: ${subHref}`);
                  }
                });
              }
            });
    
            cy.get('body').click(0, 0); 
          } else if (href && !href.includes('#')) {
            
            cy.request({
              url: href,
              timeout: 1000000 // Increased timeout here
            }).then((response) => {
              if (response.status === 200) {
                cy.log(`${section} link working: ${href}`);
              } else {
                cy.log(`${section} link failed: ${href}`);
              }
            });
          }
        });
      }
    
      it.only('Check if all navigation bar links (including dropdowns) are working and log them', () => {
        cy.reload()
        checkLinksAndDropdowns('nav');
      });
    
  
      it.only('Check if all footer links (including dropdowns) are working and log them', () => {
        cy.reload()
        checkLinksAndDropdowns('footer');
      });
  
      it.only('Check hover effects on header and footer links', () => {
        // Check header hover effects
        cy.reload()
        cy.get('header a').each(link => {
          cy.wrap(link)
            .trigger('mouseover') 
            .should('have.css', 'color') 
            .and('not.eq', 'initialColor'); 
        });
    
        // Check footer hover effects
        cy.get('footer a').each(link => {
          cy.wrap(link)
            .trigger('mouseover')
            .should('have.css', 'color')
            .and('not.eq', 'initialColor');
        });
      });
    
  
  });
  