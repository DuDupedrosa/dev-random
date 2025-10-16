import mockUser from '../fixtures/user.json';
import { getRandomUser } from '../helpers/getRandomUser';

describe('Login test flow', () => {
  it('should successfully login', () => {
    cy.visit('/user/authenticate');

    cy.intercept('POST', '/api/user/login').as('loginRequest');

    cy.get('[data-test="Login:Email"]').type(mockUser.email);
    cy.get('[data-test="Login:Password"]').type(mockUser.password);
    cy.get('[data-test="Login:Submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200);
    });
  });

  it('should return 404 - not found user', () => {
    const user = getRandomUser();

    cy.visit('/user/authenticate');

    cy.intercept('POST', '/api/user/login').as('loginRequest');

    cy.get('[data-test="Login:Email"]').type(user.email);
    cy.get('[data-test="Login:Password"]').type(user.password);
    cy.get('[data-test="Login:Submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(404);
      cy.get('[data-test="AlertError:Text"]')
        .should('be.visible')
        .and('contain', 'Não encontramos nenhuma conta com este e-mail.');
    });
  });

  it('should return 400 - invalid password', () => {
    cy.visit('/user/authenticate');

    cy.intercept('POST', '/api/user/login').as('loginRequest');

    cy.get('[data-test="Login:Email"]').type(mockUser.email);
    cy.get('[data-test="Login:Password"]').type('Invalid password');
    cy.get('[data-test="Login:Submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(400);
      cy.get('[data-test="AlertError:Text"]')
        .should('be.visible')
        .and('contain', 'E-mail ou senha incorretos.');
    });
  });
});
