const patient = {
  username: "dakotawong1",
  password: "1234"
}
const doctor = {
  username: "anjy",
  password: "hello123"
}

describe('General User Tests',()=>{
  it("Visit page that doesn't exist",()=>{
    // Sign In and redirect to non exisiting page
    cy.visit('/notExisting')

    // Check for Page Not FOund Header
    cy.get('.page-not-found-header').should('be.visible')

    // Return Home
    cy.get('.error-page-button').click()
    
    // Check the URL is updated correctly
    cy.url().should('include', '/patient-login')
  })
  it("view record without id",()=>{
    // Visit site address
    cy.visit('/patient-login')

    // Login with test user credentials
    cy.intercept('*').as('res')
    cy.get('[name="UserName"]').type(patient.username)
    cy.get('[name="Password"]').type(patient.password)
    cy.get('button').click()
      .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

    // Enter homepage
    cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
    
    // Check for page not found header
    cy.visit('/patientinfo/viewrecord')

    // Click on go back button
    cy.get('.error-page-button').click()

    // Check that we have returned home
    cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
  })
  it("view record with invalid id (Patient)",()=>{
    // Visit site address
    cy.visit('/patient-login')

    // Login with test user credentials
    cy.intercept('*').as('res')
    cy.get('[name="UserName"]').type(patient.username)
    cy.get('[name="Password"]').type(patient.password)
    cy.get('button').click()
      .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

    // Enter homepage
    cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
    
    // Check for page not found header
    cy.visit('/patientinfo/viewrecord')

    // Click on go back button
    cy.get('.error-page-button').click()

    // Check that we have returned home
    cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
  })
  it("view record with invalid id (Doctor)",()=>{
    // Visit site address
    cy.visit('/doctor-login')

    // Login with test user credentials
    cy.intercept('*').as('res')
    cy.get('[name="UserName"]').type(doctor.username)
    cy.get('[name="Password"]').type(doctor.password)
    cy.get('button').click()
      .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

    // Enter homepage
    cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
    
    // Check for page not found header
    cy.visit('/doctorinfo/viewrecord')

    // Click on go back button
    cy.get('.error-page-button').click()

    // Check that we have returned home
    cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
  })
})