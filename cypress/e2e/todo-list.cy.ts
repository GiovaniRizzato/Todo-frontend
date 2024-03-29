describe('Todo list page', () => {
  describe('When all the endpoints responds perfectly', () => {
    before(() => {
      cy.mocksSetCollection("main");
      cy.mocksSetDelay(100);
      cy.visit("/");
    });
  
    it('should display all the todo items', () => {
      cy.findByRole('progressbar').should('exist');
      cy.wait(300);
      cy.findByRole('checkbox', {name: /Test label 1/i, checked: true}).should('exist');
      cy.findByRole('checkbox', {name: /Test label 2/i, checked: false}).should('exist');
      cy.findByRole('checkbox', {name: /Test label 3/i, checked: true}).should('exist');
    });
  
    after(() => {
      cy.mocksRestoreRouteVariants();
    });
  })
})
