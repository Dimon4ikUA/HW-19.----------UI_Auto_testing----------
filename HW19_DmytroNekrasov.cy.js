
import {faker} from "@faker-js/faker"

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password({length: 10}) + 'Q1q';
const randomFN = faker.person.firstName();
const randomLN = faker.person.lastName();

context('QA Auto', () => {
    beforeEach(() =>{
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
    })
  describe('Registration form', () => {
    it('Register the user via sign-up button-random', () => {
        cy.contains('Sign up').click();
        cy.get('.modal-title').should('have.text', 'Registration');
        cy.get('#signupName').type(randomFN);
        cy.get('#signupLastName').type(randomLN);
        cy.get('#signupEmail').type(randomEmail);
        cy.get('#signupPassword').type(randomPassword);
        cy.get('#signupRepeatPassword').type(randomPassword);
        cy.get('.modal-footer > .btn').click();
        cy.get('.panel-page_heading > .btn').should('contain.text','Add car');
    })
  }) 
  describe('Manipulation with logged user', () => {
    it('Checking first and last name', () => {
      cy.get('.header_right > .btn').click();
      cy.get('.modal-header').should('contain','Log in');
      cy.get('#signinEmail').type(randomEmail);
      cy.get('#signinPassword').type(randomPassword);
      cy.contains('Login').click();
      cy.get('[routerlink="profile"]').should('exist');
      cy.get('.sidebar_btn.-profile').click();
      cy.get('.profile_name').should('contain', randomFN);
      cy.get('.profile_name').should('contain', randomLN);
    })
    it('Add a new car-Fiat Punto', () => {
      cy.get('.header_right > .btn').click();
      cy.get('#signinEmail').type(randomEmail);
      cy.get('#signinPassword').type(randomPassword);
      cy.contains('Login').click();
      cy.get('.panel-page_heading > .btn').click();
      cy.get('.modal-header').should('contain','Add a car');
      cy.get('#addCarBrand').select('Fiat');
      cy.get('#addCarModel').select('Punto');
      cy.get('#addCarMileage').type('44'); 
      cy.get('.modal-footer > .btn-primary').click();  
    })
    it('Add an expense for car Fiat Punto', () => {
      cy.get('.header_right > .btn').click();
      cy.get('#signinEmail').type(randomEmail);
      cy.get('#signinPassword').type(randomPassword);
      cy.contains('Login').click();
      cy.get('.sidebar > .-active').click();
      cy.get('.car_name').should('contain','Fiat Punto');
      cy.get('.car_add-expense').click();
      cy.get('.modal-title').should('have.text', 'Add an expense');
      cy.get('#addExpenseMileage').click().type('444');
      cy.get('#addExpenseLiters').type('33');
      cy.get('#addExpenseTotalCost').type('39');
      cy.get('.modal-footer > .btn-primary').click();
      cy.get('.col-lg-9').should('contain','Total cost');
    })  
    it('Delete account', () => {
      cy.get('.header_right > .btn').click();
      cy.get('#signinEmail').type(randomEmail);
      cy.get('#signinPassword').type(randomPassword);
      cy.contains('Login').click();
      cy.get('[routerlink="settings"]').should('exist');
      cy.get('[routerlink="settings"]').click();
      cy.get('.panel-layout').should('contain','Remove account');
      cy.get('.user-settings_form > .btn').should('have.css', 'color', 'rgb(255, 255, 255)');
      cy.get('.user-settings_form > .btn').click();
      cy.get('.modal-title').should('have.text', 'Remove account');
      cy.get('.btn-danger').click();
      cy.get('.header_right > .btn').should('have.text', 'Sign In');
    })  
  })
})  