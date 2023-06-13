describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "test user",
      username: "testuser",
      password: "secret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("fails with wrong credentials", function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong credentials");
    });

    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("secret");
      cy.get("#login-button").click();
      cy.contains("testuser logged in");
    });
  });
});
