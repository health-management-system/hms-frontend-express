import { slowCypressDown } from 'cypress-slow-down'
// E2E test using test users
const user = {
    username: "anjy",
    password: "hello123"
}
const user2 = {
    username: "test_doctor_1",
    password: "Welcome1%"
}

import generateRandomString from "./utils"

describe('Existing Doctor Tests', () => {
    // Sign In before each test
    beforeEach(() => {
        // Visit site address
        cy.visit('/doctor-login')

        // Login with test user credentials
        cy.get('[name="UserName"]').type(user.username)
        cy.get('[name="Password"]').type(user.password)
        cy.get('button').click()

        // Enter the Doctor Profile
        cy.get('.content > div > :nth-child(1)').click()

        // Check the URL is updated correctly
        cy.url().should('include', '/doctorinfo')
    })
    it('Test user can signout', () => {
        // Signout
        cy.get('[data-cy="Navbar-sign-out"]').click()

        // Check the URL is updated correctly
        cy.url().should('include', '/patient-login')
    })
    it('Test user can update doctor info', () => {
        // generate info
        const firstname = 'Anjola'
        const lastname = 'Akindipe'
        const staffid = generateRandomString(10)
        const clinic = "Waterloo Central"
        const specialization = 'General Doctor'
        const email = 'anjyakindie@gmail.com'
        const phonenumber = '613-888-1111'

        // Navigate to update info
        cy.get('[data-cy="Navbar-menu-normal"]').click()
        cy.get(':nth-child(2) > h3').click()
        cy.url().should('include', '/doctorinfo/update')

        // Update Info
        cy.get('#firstname').clear().type(firstname)
        cy.get('#lastname').clear().type(lastname)
        cy.get('#staffid').clear().type(staffid)
        cy.get('#clinic').clear().type(clinic)
        cy.get('#specialization').clear().type(specialization)
        cy.get('#email').clear().type(email)
        cy.get('#phoneNumber').clear().type(phonenumber)
        cy.get('#submit-button').click()

        // Check if updated info appears on profile
        cy.get(':nth-child(1) > .user-info-span').should('have.text', firstname)
        cy.get(':nth-child(2) > .user-info-span').should('have.text', lastname)
        cy.get(':nth-child(3) > .user-info-span').should('have.text', staffid)
        cy.get(':nth-child(4) > .user-info-span').should('have.text', clinic)
        cy.get(':nth-child(5) > .user-info-span').should('have.text', specialization)
        cy.get(':nth-child(6) > .user-info-span').should('have.text', email)
        cy.get(':nth-child(7) > .user-info-span').should('have.text', phonenumber)
    })
    it('Tests user can successfully post a record', () => {
        // generate info
        const patientID = "test_record_patient"
        const subject = "Cypress E2E Tests"
        const date = "10/04/2023"
        const log = "This is a cypress E2E test log"

        // Enter the info
        cy.get('#patient-input').type(patientID)
        cy.get('#subject-input').type(subject)
        cy.get('#date-input').type(date)
        cy.get('#log-input').type(log)

        // Post record and listen for response
        cy.intercept('*').as('req')
        cy.get('.add-record-button').click()

        // Assert backend returns the correct response
        cy.wait('@req', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('eq', 200)

        // Assert alert is displayed
        cy.get('.go3958317564').should('be.visible')
    })
    it('Tests user cannot post an invalid record', () => {

        // Post invalid record and listen for response
        cy.intercept('http://localhost:4000/doctor/record-add*').as('req')
        cy.get('.add-record-button').click()

        // Assert backend returns the correct response
        cy.wait('@req', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gt', 300)
        
        // Assert alert is displayed
        cy.get('.go3958317564').should('be.visible')
    })
    it('Tests a doctor can view a patient', () => {
        // Navigate to view patients info
        cy.get('[data-cy="Navbar-menu-normal"]').click()
        cy.get(':nth-child(3) > h3').click()
        cy.url().should('include', '/doctorinfo/viewpatients')

        // Click to view a patient
        cy.intercept('http://localhost:4000/patient/patientinfo?username=*').as('res')
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        // Can navigate back
        cy.intercept('http://localhost:4000/patient/getpatients*').as('res')
        cy.get('.hover\\:bg-priHover').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
    })
    it('Tests a doctor can view a patient record', () => {
        // Navigate to view patients info
        cy.get('[data-cy="Navbar-menu-normal"]').click()
        cy.get(':nth-child(3) > h3').click()
        cy.url().should('include', '/doctorinfo/viewpatients')

        // Click to view a patient
        cy.intercept('http://localhost:4000/patient/patientinfo?username=*').as('res')
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        // Click to view a patient
        cy.intercept('http://localhost:4000/doctor/viewrecord*').as('res')
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        // Click back button
        cy.intercept('http://localhost:4000/patient/patientinfo?username=*').as('res')
        cy.get('.py-10 > .bg-priCol').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
    })
    it('Tests that view patient can handle errors', () => {
        // Navigate to doctorinfo
        cy.visit('/doctorinfo')
        
        // Navigate to view patients info
        cy.visit('/doctorinfo/viewpatient')

        // Check we got redirected back a page
        cy.url().should('include', '/doctorinfo')
    })
    it('Tests a doctor can view a patients doctor', () => {
        // Navigate to view patients info
        cy.get('[data-cy="Navbar-menu-normal"]').click()
        cy.get(':nth-child(3) > h3').click()
        cy.url().should('include', '/doctorinfo/viewpatients')

        // Click to view a patient
        cy.intercept('http://localhost:4000/patient/patientinfo?username=*').as('res')
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        // Click to view a patient
        cy.intercept('http://localhost:4000/doctor/viewrecord*').as('res')
        cy.get("[data-cy=PatientHistoryTable-record-field]").first().click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // Click to view other doctor profile
        cy.intercept('http://localhost:4000/doctor/doctorinfo*').as('res')
        cy.get('.view-doctor-button').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        // Click back button
        cy.intercept('http://localhost:4000/doctor/viewrecord*').as('res')
        cy.get('.py-10 > .bg-priCol').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
    })
    it('View Patients endpoint will handle invalid query string parameters', () => {
        // Visit site address
        cy.visit('/doctor-login')

        // Login with test user credentials
        cy.intercept('*').as('res')
        cy.get('[name="UserName"]').type(user.username)
        cy.get('[name="Password"]').type(user.password)
        cy.get('button').click()
          .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // Enter homepage
        cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
        
        // Check for page not found header
        cy.intercept('GET', 'http://localhost:4000/doctor/getpatients?page=1', {statusCode: 400})
        cy.visit('/doctorinfo/viewpatients').wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // Check that we have returned home
        cy.get('[data-cy="PatientHistoryTable-loading-text"]').should('be.visible')
    })
    it('Test Doctor can paginate through patient table', () => {
        // Visit site address
        cy.visit('/doctor-login')

        // Login with test user credentials
        cy.intercept('*').as('res')
        cy.get('[name="UserName"]').type(user.username)
        cy.get('[name="Password"]').type(user.password)
        cy.get('button').click()
          .wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // Enter homepage
        cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')
        
        // Check for page not found header
        cy.visit('/doctorinfo/viewpatients').wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // Slow down cypress interactions
        slowCypressDown(500)

        // Click refresh button
        cy.intercept('*').as('res')
        cy.get('[data-cy="refesh-table-button"]').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        //Assert user starts on page 1
        cy.get('[data-cy="PaginationNavigator-currentpage"]').should('have.text', '1')
        
        // Paginate Forward
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
        //cy.get('[data-cy="PaginationNavigator-currentpage"]', { timeout: 10000 }).should('have.text', '1')

        // Return cypress interactions to regular speed
        slowCypressDown(false)
    })
    it('Test Doctor can paginate through patient records', () => {

        // Navigate to view patient
        cy.intercept('*').as('res')
        cy.visit('/doctorinfo/viewpatient?patientUsername=dakotawong1').wait('@res', {responseTimeout: 10000, requestTimeout:10000})

        // Slow down cypress interactions
        slowCypressDown(500)

        // Click refresh button
        cy.intercept('*').as('res')
        cy.get('[data-cy="refesh-table-button"]').click()
            .wait('@res', {responseTimeout: 10000, requestTimeout:10000})
        
        //Assert user starts on page 1
        cy.get('[data-cy="PaginationNavigator-currentpage"]').should('have.text', '1')
        
        // Paginate Forward
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
