const patient = {
    username: "dakotawong1",
    password: "1234"
}
const doctor = {
    username: "anjy",
    password: "hello123"
}

describe('Authorization Tests', () => {
    it('Patient cannot visit doctor pages', () => {
        // Visit site address
        cy.visit('/patient-login')

        // Login with test user credentials
        cy.intercept('http://localhost:4000/auth/login-patient*').as('login')
        cy.get('[name="UserName"]').type(patient.username)
        cy.get('[name="Password"]').type(patient.password)
        cy.get('button').click().wait('@login', {responseTimeout: 10000, requestTimeout:10000})

        // Enter homepage
        cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')

        // Check for page not found header
        cy.intercept('http://localhost:4000/doctor/doctorinfo?username*').as('doctor')
        cy.visit('/doctorinfo')

        // Assert access is not granted
        cy.wait('@doctor', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gte', 400)

        // Check we are redirected to patient page
        cy.intercept('http://localhost:4000/patient/*').as('patient')
        cy.url().should('include', '/patientinfo')
        cy.wait('@patient', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.lt', 400)
    })
    it('Cannot visit doctor page if not signed in', () => {
        // Check for page not found header
        cy.intercept('http://localhost:4000/doctor/doctorinfo?username*').as('doctor')
        cy.visit('/doctorinfo')

        // Assert access is not granted
        cy.wait('@doctor', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gte', 400)

        // Check we are redirected to patient page
        cy.url().should('include', '/patient-login')
    })
    it('Doctor cannot visit patient pages', () => {
        // Visit site address
        cy.visit('/doctor-login')

        // Login with test user credentials
        cy.intercept('http://localhost:4000/auth/login-doctor*').as('login')
        cy.get('[name="UserName"]').type(doctor.username)
        cy.get('[name="Password"]').type(doctor.password)
        cy.get('button').click().wait('@login', {responseTimeout: 10000, requestTimeout:10000})

        // Enter homepage
        cy.get('.homepage-button-div > :nth-child(1)').should('be.visible')

        // Check for page not found header
        cy.intercept('http://localhost:4000/patient/patientinfo?username*').as('patient')
        cy.visit('/patientinfo').wait('@patient', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gte', 400)

        // Assert access is not granted
        cy.intercept('http://localhost:4000/doctorinfo?username=*').as('doctor')
        cy.wait('@patient', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gte', 400)

        // Check we are redirected to patient page
        cy.url().should('include', '/doctorinfo')
    })
    it('Cannot visit patient page if not signed in', () => {
        // Check for page not found header
        cy.intercept('http://localhost:4000/patient/patientinfo?username*').as('patient')
        cy.visit('/patientinfo')

        // Assert access is not granted
        cy.wait('@patient', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gte', 400)

        // Check we are redirected to patient page
        cy.url().should('include', '/patient-login')
    })
})

describe('Login and Signup Tests', () => {
    it('Allows user to signup', () => {
        // Intercept the signup
        cy.intercept('POST', 'http://localhost:4000/auth/register-patient*', { statusCode: 201 }).as('signup')

        // Visit site address
        cy.visit('/patient-signup')

        // Enter info
        cy.get('[name="FirstName"]').type('Tester')
        cy.get('[name="LastName"]').type('Tester')
        cy.get('[name="UserName"]').type('E2E_Signup')
        cy.get('[name="Email"]').type('Test@gmail.com')
        cy.get('[name="Password"]').type('1234')
        cy.get('[name="ConfirmPassword"]').type('1234')

        // Submit signup
        cy.get('button').click()
            .wait('@signup', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('eq', 201)
        
        // Check we are redirected to patient login page
        cy.url().should('include', '/patient-login')
    })
    it('Handles invalid user signup', () => {
        // Intercept the signup
        cy.intercept('POST', 'http://localhost:4000/auth/register-patient*', { statusCode: 400 }).as('signup')

        // Visit site address
        cy.visit('/patient-signup')

        // Enter info
        cy.get('[name="FirstName"]').type('Tester')
        cy.get('[name="LastName"]').type('Tester')
        cy.get('[name="UserName"]').type('E2E_Signup')
        cy.get('[name="Email"]').type('Test@gmail.com')
        cy.get('[name="Password"]').type('1234')
        cy.get('[name="ConfirmPassword"]').type('1234')

        // Submit signup
        cy.get('button').click()
            .wait('@signup', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('eq', 400)
        
        // Check we stay on the patient signup page
        cy.url().should('include', '/patient-signup')
    })
    it('Allows valid doctor login', () => {
        // Visit site address
        cy.visit('/doctor-login')
        // Login with test user credentials
        cy.intercept('http://localhost:4000/auth/*').as('login')
        cy.get('[name="UserName"]').type(doctor.username)
        cy.get('[name="Password"]').type(doctor.password)
        cy.get('button').click()
            .wait('@login', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.lt', 300)
        
        // Signout
        cy.get('.content > div > :nth-child(2)').click()

        // Check we stay on the patient signup page
        cy.url().should('include', '/patient-login')
    })
    it('Allows valid patient login', () => {
        // Visit site address
        cy.visit('/patient-login')
        // Login with test user credentials
        cy.intercept('http://localhost:4000/auth/*').as('login')
        cy.get('[name="UserName"]').type(patient.username)
        cy.get('[name="Password"]').type(patient.password)
        cy.get('button').click()
            .wait('@login', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.lt', 300)
        
        // Signout
        cy.get('.content > div > :nth-child(2)').click()

        // Check we stay on the patient signup page
        cy.url().should('include', '/patient-login')
    })
    it('Prevents invalid doctor login', () => {
        // Visit site address
        cy.visit('/doctor-login')
        // Login with test user credentials
        cy.intercept('http://localhost:4000/auth/login-doctor*').as('login')
        cy.get('[name="UserName"]').type("fake_username")
        cy.get('[name="Password"]').type("password")
        cy.get('button').click()
            .wait('@login', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gt', 400)
    })
    it('Prevents invalid patient login', () => {
        // Visit site address
        cy.visit('/patient-login')
        // Login with test user credentials
        cy.intercept('http://localhost:4000/auth/login-patient*').as('login')
        cy.get('[name="UserName"]').type("fake_username")
        cy.get('[name="Password"]').type("password")
        cy.get('button').click()
            .wait('@login', {responseTimeout: 10000, requestTimeout:10000}).its('response.statusCode').should('be.gt', 400)
    })
})