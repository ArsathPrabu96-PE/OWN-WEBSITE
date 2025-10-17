/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to test API endpoints
       * @example cy.testApiEndpoint('/projects')
       */
      testApiEndpoint(endpoint: string): Chainable<void>
      
      /**
       * Custom command to wait for page load
       * @example cy.waitForPageLoad()
       */
      waitForPageLoad(): Chainable<void>
    }
  }
}

// Custom command to test API endpoints
Cypress.Commands.add('testApiEndpoint', (endpoint: string) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiUrl')}${endpoint}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201, 204])
  })
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.wait(1000) // Wait for animations
})

export {}