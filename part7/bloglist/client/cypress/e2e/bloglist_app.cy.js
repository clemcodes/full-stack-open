describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user1 = {
      name: "test user",
      username: "testuser",
      password: "secret",
    };
    const user2 = {
      name: "cypress",
      username: "cypress",
      password: "secret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user1);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
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

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "a note created by cypress",
          author: "cypress",
          url: "/testurl",
        });
      });

      it("users can like a blog", function () {
        cy.contains("a note created by cypress cypress")
          .contains("view")
          .click();
        cy.get("#likes").find("button").click();
        cy.get("#likes").should("contain", "likes 1");
      });

      it("user who created a blog can delete it", function () {
        cy.contains("a note created by cypress cypress")
          .contains("view")
          .click();
        cy.contains("Remove").click();
        cy.get("html").should("not.contain", "a note created by cypress");
      });
    });

    describe("and multiple blog exists", function () {
      beforeEach(function () {
        cy.login({ username: "testuser", password: "secret" });
        cy.createBlog({
          title: "a note created by testuser",
          author: "testuser",
          url: "/testurl",
        });
        cy.contains("logout").click("");
        cy.login({ username: "cypress", password: "secret" });
        cy.createBlog({
          title: "a note created by cypress",
          author: "cypress",
          url: "/testurl",
        });
      });

      it("only the creator can see the delete button of a blog, not anyone else", function () {
        cy.contains("a note created by testuser").contains("view").click();
        cy.contains("a note created by testuser").should(
          "not.contain",
          "Remove"
        );
      });

      it("the blogs are ordered according to likes in descending order", function () {
        cy.contains("a note created by cypress cypress").as("blog1");
        cy.contains("a note created by testuser testuser").as("blog2");

        cy.get("@blog1").contains("view").click();
        cy.get("@blog1").contains("like").click();
        cy.wait(100);

        cy.get("@blog2").contains("view").click();
        cy.get("@blog2").contains("like").click();
        cy.wait(100);
        cy.get("@blog2").contains("like").click();
        cy.wait(100);
        cy.get("@blog2").contains("like").click();

        cy.get(".blog")
          .eq(0)
          .should("contain", "a note created by testuser testuser");
        cy.get(".blog")
          .eq(1)
          .should("contain", "a note created by cypress cypress");
      });
    });
  });
});
