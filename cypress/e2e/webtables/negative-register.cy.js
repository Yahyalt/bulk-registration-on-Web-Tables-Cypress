import webTablesPage from "../../support/pages/WebTablesPage";

Cypress.on("uncaught:exception", () => false);

describe("Web Tables negative registration", () => {
  let data;

  before(() => {
    cy.fixture("users_invalid.json").then((d) => (data = d));
  });

  beforeEach(() => {
    webTablesPage.visit();
  });

  it("Email left empty shows validation and is not saved", () => {
    webTablesPage.addUser(data.emptyEmail);
    webTablesPage.verifyFieldInvalid("#userEmail");
    webTablesPage.verifyValidationShown();
    webTablesPage.closeModal();
    webTablesPage.verifyUserNotInTable(data.emptyEmail.firstName);
  });

  it("Age filled with letters shows validation and is not saved", () => {
    webTablesPage.addUser(data.alphaAge);
    webTablesPage.verifyFieldInvalid("#age");
    webTablesPage.verifyValidationShown();
    webTablesPage.closeModal();
    webTablesPage.verifyUserNotInTable(data.alphaAge.email);
  });

  it("Salary left empty shows validation and is not saved", () => {
    webTablesPage.addUser(data.emptySalary);
    webTablesPage.verifyFieldInvalid("#salary");
    webTablesPage.verifyValidationShown();
    webTablesPage.closeModal();
    webTablesPage.verifyUserNotInTable(data.emptySalary.email);
  });
});
