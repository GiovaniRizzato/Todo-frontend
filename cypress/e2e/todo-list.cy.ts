describe('Todo list page', () => {
  describe('When all the endpoints responds perfectly', () => {
    beforeEach(() => {
      cy.mocksSetCollection("main");
      cy.mocksSetDelay(100);
      cy.visit("/");

      cy.findByRole('progressbar').should('exist');
      cy.wait(300);
    });
  
    it('should display all the todo items', () => {
      cy.findByRole('checkbox', {name: /Test label 1/i, checked: true}).should('exist');
      cy.findByRole('checkbox', {name: /Test label 2/i, checked: false}).should('exist');
      cy.findByRole('checkbox', {name: /Test label 3/i, checked: true}).should('exist');
    });

    it('should be able to create a new todo item', () => {
      cy.findByRole('textbox', {name: /New Todo/i}).type('New todo test');
      cy.findByRole('button', {name: /Confirm creation of todo/i}).click();

      cy.findByRole('checkbox', {name: /New todo test/i}).should('exist');
    });

    it('should be able to edit the label for a existing item', () => {
      cy.findByRole('button', {name: /Test label 1 edit/i}).click();
      //The {force: true} is because the input is been "covered" by the placeholder presentation
      cy.findByRole('textbox', {name: /New description/i}).type('Edited todo label', {force: true});
      cy.findByRole('button', {name: /Confirm change/i}).click();

      cy.findByRole('checkbox', {name: /Test label 1/i, checked: true}).should('not.exist');
      cy.findByRole('checkbox', {name: /Edited todo label/i, checked: true}).should('exist');
    });

    it('should be able to remove a todo item', () => {
      cy.findByRole('button', {name: /Test label 2 removal/i}).click();

      cy.findByRole('checkbox', {name: /Test label 2/i, checked: false}).should('not.exist');
    });
  
    after(() => {
      cy.mocksRestoreRouteVariants();
    });
  });

  describe('When the endpoints for modifying todos returns errors', () => {
    beforeEach(() => {
      cy.mocksSetCollection("error");
      cy.mocksSetDelay(100);
      cy.visit("/");
      cy.wait(300);
    });

    it('should rowback the created todo item', () => {
      cy.findByRole('textbox', {name: /New Todo/i}).type('New todo test');
      cy.findByRole('button', {name: /Confirm creation of todo/i}).click();

      cy.findByRole('checkbox', {name: /New todo test/i}).should('exist');
      //awating the server response
      cy.wait(300);
      //rowback to "uncreated" state after the error message from server
      cy.findByRole('checkbox', {name: /New todo test/i}).should('not.exist');
      cy.findByText(/ERROR/i).should('exist');
    });

    it('should rowback the edit on the todo item', () => {
      cy.findByRole('button', {name: /Test label 1 edit/i}).click();
      //The {force: true} is because the input is been "covered" by the placeholder presentation
      cy.findByRole('textbox', {name: /New description/i}).type('Edited todo label', {force: true});
      cy.findByRole('button', {name: /Confirm change/i}).click();

      cy.findByRole('checkbox', {name: /Test label 1/i, checked: true}).should('not.exist');
      cy.findByRole('checkbox', {name: /Edited todo label/i, checked: true}).should('exist');
      //awating the server response
      cy.wait(300);
      //rowback to "edited" state after the error message from server
      cy.findByRole('checkbox', {name: /Test label 1/i, checked: true}).should('exist');
      cy.findByRole('checkbox', {name: /Edited todo label/i, checked: true}).should('not.exist');
      cy.findByText(/ERROR/i).should('exist');
    });

    it('should rowback removal of a todo item', () => {
      cy.findByRole('button', {name: /Test label 2 removal/i}).click();

      cy.findByRole('checkbox', {name: /Test label 2/i, checked: false}).should('not.exist');
      //awating the server response
      cy.wait(300);
      //rowback to "uncreated" state after the error message from server
      cy.findByRole('checkbox', {name: /Test label 2/i, checked: false}).should('exist');
      cy.findByText(/ERROR/i).should('exist');
    });

    after(() => {
      cy.mocksRestoreRouteVariants();
    });
  });
})
