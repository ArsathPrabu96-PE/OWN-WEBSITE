/// <reference types="cypress" />

describe('API Testing', () => {
  const apiUrl = Cypress.env('apiUrl') || 'http://localhost:3002'

  before(() => {
    // Ensure backend is running
    cy.request({
      method: 'GET',
      url: apiUrl,
      failOnStatusCode: false
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Backend server is not running on port 3002')
      }
    })
  })

  describe('Backend API Endpoints', () => {
    it('should respond to root endpoint', () => {
      cy.request('GET', `${apiUrl}/`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.eq('Hello World!')
        })
    })

    it('should get all projects', () => {
      cy.request('GET', `${apiUrl}/projects`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('success', true)
          expect(response.body).to.have.property('data')
          expect(response.body.data).to.be.an('array')
        })
    })

    it('should get featured projects', () => {
      cy.request('GET', `${apiUrl}/projects/featured`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('success', true)
          expect(response.body).to.have.property('data')
        })
    })

    it('should get project statistics', () => {
      cy.request('GET', `${apiUrl}/projects/stats`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('success', true)
          expect(response.body.data).to.have.property('total')
          expect(response.body.data).to.have.property('featured')
          expect(response.body.data).to.have.property('byCategory')
        })
    })

    it('should get all contacts', () => {
      cy.request('GET', `${apiUrl}/contact`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('success', true)
          expect(response.body).to.have.property('data')
        })
    })

    it('should create a new contact', () => {
      const contactData = {
        name: 'Cypress Test User',
        email: 'cypress@test.com',
        service: 'Web Development',
        budget: '$5000-$10000',
        timeline: '2-3 months',
        message: 'This is a test contact from Cypress E2E testing'
      }

      cy.request('POST', `${apiUrl}/contact`, contactData)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.body).to.have.property('success', true)
          expect(response.body).to.have.property('message', 'Contact form submitted successfully')
          expect(response.body.data).to.have.property('name', contactData.name)
          expect(response.body.data).to.have.property('email', contactData.email)
        })
    })

    it('should access API documentation', () => {
      cy.request('GET', `${apiUrl}/api`)
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.contain('Swagger UI')
        })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid contact data', () => {
      const invalidContactData = {
        name: 'Test',
        email: 'invalid-email'
      }

      cy.request({
        method: 'POST',
        url: `${apiUrl}/contact`,
        body: invalidContactData,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('should handle non-existent endpoints', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/nonexistent`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })
})