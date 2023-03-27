import { slowCypressDown } from 'cypress-slow-down'

// E2E test using test users
const user1 = {
    username: "e2e_patient",
    password: "passWord1"
}
const user = {
    username: "dakotawong1",
    password: "1234"
}

import generateRandomString from "./utils"

// describe('New patient Tests', () => {
//     // Sign In before each test
//     beforeEach(() => {
//         // Visit site address
//         cy.visit('/')
    
//         // Login with test user credentials
//         cy.get('[name="UserName"]').type(user2.username)
//         cy.get('[name="Password"]').type(user2.password)
//         cy.get('button').click()
        
//         // Enter the Doctor Profile
//         cy.get('.homepage-button-div > :nth-child(1)').click()
    
//         // Check the URL is updated correctly
//         cy.url().should('include', '/patientinfo')
//     })
//     it('Test new patient user is redirected to registration', () => {
//         // Check that the url matches the registration page
//         cy.url().should('include', '/patientinfo/update')

//         // Assert alert is displayed
//         cy.get('.go2072408551').should('be.visible')
//     })
// })

describe('Patient Tests', () => {
    // Sign In before each test
    beforeEach(() => {
        // Visit site address
        cy.visit('/patient-login')

        // Login with test user credentials
        cy.get('[name="UserName"]').type(user.username)
        cy.get('[name="Password"]').type(user.password)
        cy.get('button').click()

        // Enter the Patient Profile
        cy.get('.content > div > :nth-child(1)').click()

        // Check the URL is updated correctly
        cy.url().should('include', '/patientinfo')
    })
    it('Test user can update patient info', () => {
        // generate info
        const firstname = 'Dakota'
        const lastname = 'Wong'
        const dateOfBirth = '10/09/1995'
        const email = 'dakota@gmail.com'
        const phoneNumber = '613-888-1111'
        const address = '250 Sunview St, Waterloo ON'
        const postalCode = 'N2L 0H1'
        const healthCardNumber = generateRandomString(10)

        // Navigate to update info
        cy.get('[data-cy="Navbar-menu-normal"]').click()
        cy.get(':nth-child(2) > h3').click()
        cy.url().should('include', '/patientinfo/update')

        // Update Info
        cy.get('#firstname').clear().type(firstname)
        cy.get('#lastname').clear().type(lastname)
        cy.get('#dateOfBirth').clear().type(dateOfBirth)
        cy.get('#email').clear().type(email)
        cy.get('#phoneNumber').clear().type(phoneNumber)
        cy.get('#address').clear().type(address)
        cy.get('#postalCode').clear().type(postalCode)
        cy.get('#healthCardNumber').clear().type(healthCardNumber)
        cy.get('#firstname').clear().type(firstname)
        cy.get('#submit-button').click()

        // Check if updated info appears on profile
        cy.get(':nth-child(1) > .user-info-span').should('have.text', firstname)
        cy.get(':nth-child(2) > .user-info-span').should('have.text', lastname)
        cy.get(':nth-child(3) > .user-info-span').should('have.text', '1995-10-09T04:00:00.000Z')
        cy.get(':nth-child(4) > .user-info-span').should('have.text', email)
        cy.get(':nth-child(5) > .user-info-span').should('have.text', address)
        cy.get(':nth-child(6) > .user-info-span').should('have.text', phoneNumber)
        cy.get(':nth-child(7) > .user-info-span').should('have.text', postalCode)
        cy.get(':nth-child(8) > .user-info-span').should('have.text', healthCardNumber)
    })
    it('Tests user can successfully view a record', () => {
        // Click on a record in the table
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()

        // Check for view record url
        cy.url().should('include', '/patientinfo/viewrecord?recordid=')

        // Check for record subtitle
        cy.get('[data-cy="subtitle"]').should('contain.text', 'Record')

        // Navigate back usign back button
        cy.get('.py-10 > .bg-priCol').click()

        // Check we are redirected to patient profile
        cy.url().should('include', '/patientinfo')
        cy.get('.py-10 > :nth-child(1)').should('contain.text', 'General Info')
    })

    it('Tests user can successfully view a doctor', () => {
        // Click on a record in the table
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()

        // Check for view record url
        cy.url().should('include', '/patientinfo/viewrecord?recordid=')

        // Check for record subtitle
        cy.get('[data-cy="subtitle"]').should('contain.text', 'Record')

        // Navigate to doctor profile
        cy.get('.view-doctor-button').click()

        // Check for doctor subtitle
        cy.get('[data-cy="subtitle"]').should('contain.text', 'Doctor Info:')

        // Check for view record url
        cy.url().should('include', '/patientinfo/viewdoctor')
        
        // Navigate back usign back button
        cy.get('.py-10 > .bg-priCol').click()

        // Check we are redirected to patient profile
        cy.url().should('include', '/patientinfo')
        cy.get('.py-10 > :nth-child(1)').should('contain.text', 'Record')
    })

    // Run this test last as it needs to slow Cypress (All tests after it will run slow)
    it('Tests user can paginate forward and backwards', () => {
        // Slow down cypress interactions
        slowCypressDown(2000)

        //Assert user starts on page 1
        cy.get('[data-cy="PaginationNavigator-currentpage"]').should('have.text', '1')
        
        // Paginate Forward
        cy.intercept('*').as('res')
        cy.get('[data-cy="PaginationNavigator-rightclick"] > path').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
     
        // Assert user is now on page 2
        cy.get("[data-cy=PatientHistoryTable-record-field]", { timeout: 10000 }).first().should('be.visible')
        cy.get('[data-cy="PaginationNavigator-currentpage"]', { timeout: 10000 }).should('have.text', '2')

        // Go back to page 1
        cy.get('[data-cy="PaginationNavigator-leftclick"] > path').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})


        //Assert user goes back to page 1
        cy.get("[data-cy=PatientHistoryTable-record-field]", { timeout: 10000 }).first().should('be.visible')
        cy.get('[data-cy="PaginationNavigator-currentpage"]', { timeout: 10000 }).should('have.text', '1')

        // Paginate Forward
        cy.get('[data-cy="PaginationNavigator-rightclick"] > path').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // //Assert user goes back to page 2
        cy.get("[data-cy=PatientHistoryTable-record-field]", { timeout: 10000 }).first().should('be.visible')
        cy.get('[data-cy="PaginationNavigator-currentpage"]', { timeout: 10000 }).should('have.text', '2')

        // Click refresh button
        cy.get('[data-cy="refesh-table-button"]').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // //Assert user starts on page 1
        cy.get("[data-cy=PatientHistoryTable-record-field]", { timeout: 10000 }).first().should('be.visible')
        cy.get('[data-cy="PaginationNavigator-currentpage"]', { timeout: 10000 }).should('have.text', '1')

        // Return cypress interactions to regular speed
        slowCypressDown(false)
    })
})
