describe("Example Test", () => {
    
    it("Visits the Cypress website", () => {
      cy.visit("https://www.cypress.io");
      cy.get("h1").should("contain", "Test");
    });
  });
  