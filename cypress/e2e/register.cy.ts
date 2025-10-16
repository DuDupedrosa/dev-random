import { getRandomUser } from '../helpers/getRandomUser';
import mockUser from '../fixtures/user.json';

describe('Register test flow', () => {
  it('should successfully register', () => {
    const user = getRandomUser();

    cy.visit('/user/authenticate');

    cy.intercept('POST', '/api/user/register').as('registerRequest');

    cy.get('[data-test="Authenticate:Register"]').click();
    cy.get('[data-test="Register:Name"]').type(user.name);
    cy.get('[data-test="Register:LastName"]').type(user.lastName);
    cy.get('[data-test="Register:Email"]').type(user.email);
    cy.get('[data-test="Register:Password"]').type(user.password);
    cy.get('[data-test="Register:Submit"]').click();

    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201);
    });
  });

  it('should return 400 - user already register', () => {
    const user = getRandomUser();

    cy.visit('/user/authenticate');

    cy.intercept('POST', '/api/user/register').as('registerRequest');

    cy.get('[data-test="Authenticate:Register"]').click();
    cy.get('[data-test="Register:Name"]').type(user.name);
    cy.get('[data-test="Register:LastName"]').type(user.lastName);
    cy.get('[data-test="Register:Email"]').type(mockUser.email);
    cy.get('[data-test="Register:Password"]').type(user.password);
    cy.get('[data-test="Register:Submit"]').click();

    cy.wait('@registerRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(400);
      cy.get('[data-test="AlertError:Text"]')
        .should('be.visible')
        .and('contain', 'E-mail já em uso. Tente outro ou faça login.');
    });
  });

  it('should not send the form - invalid email and password', () => {
    const user = getRandomUser();

    cy.visit('/user/authenticate');

    cy.get('[data-test="Authenticate:Register"]').click();
    cy.get('[data-test="Register:Name"]').type(user.name);
    cy.get('[data-test="Register:LastName"]').type(user.lastName);
    cy.get('[data-test="Register:Email"]').type('Invalid email');
    cy.get('[data-test="Register:Password"]').type('1');
    cy.get('[data-test="Register:Submit"]').click();

    cy.get('[data-test="Register:Email:FormMessage"]')
      .should('be.visible')
      .and('contain', 'Email inválido');

    cy.get('[data-test="Register:Password:FormMessage"]')
      .should('be.visible')
      .and('contain', 'A senha deve ter no mínimo 6 caracteres');
  });
});
