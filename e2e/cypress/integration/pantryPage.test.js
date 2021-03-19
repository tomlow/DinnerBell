/// <reference types="Cypress" />
// import User from "../../../server/src/models/User.js"
describe("As a user visiting the pantry page", () => {
  const visitPantryPage = () => {
    cy.visit("/pantry")
  }

  const signIn = () => {
    cy.visit("/user-sessions/new")
    cy.get("form").within(() => {
      cy.findByLabelText("Email").type("user@example.com");

      cy.findByLabelText("Password").type("password");

      cy.root().submit();
    })
  }

  // const awaitUser = async () => {
  //   const user = await User.query().first()
  //   return user
  // }

  before(() => {
    cy.task("db:truncate", "Ingredient");
    cy.task("db:truncate", "User")
    cy.task("db:insert", {
      modelName: "User",
      json: { email: "user@example.com", password: "password" },
    });
    signIn()
    // const userExample = awaitUser()

    // cy.task("db:insert", {
    //   modelName: "Ingredient",
    //   json: {
    //     name: "romaine lettuce",
    //     userId: userExample.id,
    //     image: "lettuce.png"
    //   }
    // })
    // cy.task("db:seed");
  });

  it("If I type an ingredient into the autocomplete and click 'put it in the pantry', the ingredient is added to the list.", () => {
    visitPantryPage()
    cy.get("form").within(() => {
      cy.findByLabelText("What are you working with?").type("romaine lettuce")

      cy.get(".ingredient-input__option").first().click()
      cy.root().submit()

      visitPantryPage()
      cy.get(".ingredient-list-item").contains("Romaine Lettuce")
    })
  })
})