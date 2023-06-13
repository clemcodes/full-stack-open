describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "test user",
      username: "testuser",
      password: "secret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("/");
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
      cy.contains("Wrong credentials").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });

    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("testuser");
      cy.get("input:last").type("secret");
      cy.get("#login-button").click();
      cy.contains("testuser logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "secret" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("a note created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("/testurl");
      cy.get("#create-blog").click();

      cy.contains("A new blog created!");
    });
  });
});
