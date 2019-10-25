// Test one, server functions page is displayed
describe('Blog application', function() {
  it('page is being displayed', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs application')
    })
})


// Test two, logging in function works properly
describe('Loggin in ', function() {

    it('fails with wrong credentials', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to application')
        cy.get('#username')
          .type('asdfasdfasdf')
        cy.get('#cy-password')
          .type('asdfasdfasdf')
        cy.contains('login')
          .click()
        cy.contains('wrong username or password')
      })
      
      it('logging in works with correct credentials', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to application')
        cy.get('#username')
          .type('dsafsdfsdafsad') // switched to nonsense before commit and push, test works well with proper credentials
        cy.get('#cy-password')
          .type('sdfsdfsdfds') // switched to nonsense before commit and push
        cy.contains('login')
          .click()
        cy.contains('Logged in successfully')
      })

  })