import Papa from "papaparse";
import webTablesPage from "../../support/pages/WebTablesPage";

describe("Web Tables bulk registration", () => {
  let users = [];

  before(() => {
    cy.readFile("cypress/fixtures/users.csv").then((csv) => {
      users = Papa.parse(csv, { header: true, skipEmptyLines: true }).data;
    });
  });

  it("registers all users from CSV", () => {
    webTablesPage.visit();

    users.forEach((u) => {
      webTablesPage.addUser(u);
      webTablesPage.verifyUserInTable(u);
    });
  });
});
