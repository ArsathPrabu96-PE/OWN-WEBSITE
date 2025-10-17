/// <reference types="cypress" />

describe('Integration Testing', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3002'

  before(() => {
    // Ensure both frontend and backend are running
    cy.request({
      method: 'GET',
      url: apiUrl,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Backend server is not running')
      }
    })
  })

  describe('API Integration', () => {
    it('should test frontend-backend connectivity', () => {
      // Visit frontend
      cy.visit('/')
      cy.wait(2000)
      
      // Test API call from frontend context
      cy.window().then((win) => {
        return win.fetch(`${apiUrl}/projects`)
          .then(response => response.json())
          .then(data => {
            expect(data).to.have.property('success', true)
            expect(data).to.have.property('data')
          })
      })
    })

    it('should handle CORS properly', () => {
      cy.visit('/')
      cy.wait(1000)
      
      // Make cross-origin request
      cy.request({
        method: 'GET',
        url: `${apiUrl}/projects`,
        headers: {
          'Origin': 'http://localhost:3001'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.headers).to.have.property('access-control-allow-origin')
      })
    })
  })

  describe('Data Flow', () => {
    it('should verify project data flow', () => {
      // Test API endpoint
      cy.request('GET', `${apiUrl}/projects`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.data).to.be.an('array')
          
          // Store project data for frontend verification
          cy.wrap(response.body.data).as('projectData')
        })
      
      // Visit frontend and verify data can be displayed
      cy.visit('/')
      cy.wait(2000)
      
      // Check if page loaded successfully
      cy.get('body').should('be.visible')
    })

    it('should verify contact form submission flow', () => {
      const testContact = {
        name: 'Integration Test User',
        email: 'integration@test.com',
        service: 'Full Stack Development',
        budget: '$10000-$25000',
        timeline: '3-6 months',
        message: 'This is an integration test for the contact form submission flow'
      }

      // Test direct API submission
      cy.request('POST', `${apiUrl}/contact`, testContact)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body.success).to.be.true
        })

      // Verify the contact was saved
      cy.request('GET', `${apiUrl}/contact`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.data).to.be.an('array')
          
          // Find our test contact
          const savedContact = response.body.data.find(
            (contact: any) => contact.email === testContact.email
          )
          expect(savedContact).to.exist
          expect(savedContact.name).to.eq(testContact.name)
        })
    })
  })

  describe('Error Handling Integration', () => {
    it('should handle API errors gracefully', () => {
      // Test with invalid endpoint
      cy.request({
        method: 'GET',
        url: `${apiUrl}/invalid-endpoint`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('should handle malformed requests', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/contact`,
        body: { invalid: 'data' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })
})