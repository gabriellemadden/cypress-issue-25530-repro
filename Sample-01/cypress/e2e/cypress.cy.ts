describe('Username/Password login via auth0', () => {
  // NOTE: I couldn't get this to work. My guess is because my baseUrl is set to http://localhost:3000?
  // it('logs in via Username/Password', () => {
  //   cy.visit('/');
  //   cy.get('input[type=text]').type(Cypress.env('AUTH0_USERNAME'));
  //   cy.get('input[type=password]').type(Cypress.env('AUTH0_PASSWORD'), {
  //     log: false,
  //   });
  //   cy.get('form').first().submit();

  //   cy.url().should('contain', Cypress.config().baseUrl); // fails

  //   // cy.visit('/')
  // });

  it('logs in via Username/Password', () => {
    cy.visit('/');
    cy.origin(Cypress.env('AUTH0_DOMAIN'), () => {
      cy.get('input[type=text]').type(Cypress.env('AUTH0_USERNAME'));
      cy.get('input[type=password]').type(Cypress.env('AUTH0_PASSWORD'), {
        log: false,
      });
      cy.get('form').first().submit();
    });

    cy.url().should('contain', Cypress.config().baseUrl); // fails

    // cy.visit('/')
  });
});
