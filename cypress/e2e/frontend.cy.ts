/// <reference types="cypress" />

describe('Frontend Testing', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/')
  })

  describe('Homepage', () => {
    it('should load the homepage successfully', () => {
      cy.get('body').should('be.visible')
      cy.title().should('not.be.empty')
    })

    it('should have proper page structure', () => {
      // Check if main content areas exist
      cy.get('body').should('exist')
      
      // Wait for any potential loading
      cy.wait(2000)
      
      // Check for common HTML elements
      cy.get('html').should('exist')
      cy.get('head').should('exist')
    })

    it('should not have console errors', () => {
      cy.window().then((win) => {
        cy.spy(win.console, 'error').as('consoleError')
      })
      
      cy.visit('/')
      cy.wait(3000) // Wait for page to fully load
      
      cy.get('@consoleError').should('not.have.been.called')
    })
  })

  describe('Navigation', () => {
    it('should handle page navigation', () => {
      cy.visit('/')
      cy.wait(2000)
      
      // Test if page loads without 404 or 500 errors
      cy.url().should('include', 'localhost:3001')
    })
  })

  describe('Responsive Design', () => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 1024, height: 768, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ]

    viewports.forEach((viewport) => {
      it(`should display correctly on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.visit('/')
        cy.wait(2000)
        
        // Check if page loads
        cy.get('body').should('be.visible')
      })
    })
  })

  describe('Performance', () => {
    it('should load within reasonable time', () => {
      const startTime = Date.now()
      
      cy.visit('/')
      cy.get('body').should('be.visible')
      
      cy.then(() => {
        const loadTime = Date.now() - startTime
        expect(loadTime).to.be.lessThan(10000) // Should load within 10 seconds
      })
    })
  })
})