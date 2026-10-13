class WebTablesPage {
  // locators
  get addButton() {
    return cy.get("#addNewRecordButton");
  }
  get firstNameInput() {
    return cy.get("#firstName");
  }
  get lastNameInput() {
    return cy.get("#lastName");
  }
  get emailInput() {
    return cy.get("#userEmail");
  }
  get ageInput() {
    return cy.get("#age");
  }
  get salaryInput() {
    return cy.get("#salary");
  }
  get departmentInput() {
    return cy.get("#department");
  }
  get submitButton() {
    return cy.get("#submit");
  }

  // actions
  visit() {
    cy.visit("/webtables");
  }

  openAddForm() {
    this.addButton.click();
  }

  fillForm(user) {
    this.firstNameInput.type(user.firstName);
    this.lastNameInput.type(user.lastName);
    this.emailInput.type(user.email);
    this.ageInput.type(user.age);
    this.salaryInput.type(user.salary);
    this.departmentInput.type(user.department);
  }

  submit() {
    this.submitButton.click();
  }

  addUser(user) {
    this.openAddForm();
    this.fillForm(user);
    this.submit();
  }

  // assertion helper
  verifyUserInTable(user) {
    cy.get("tbody").should("contain", user.email);
  }
}

export default new WebTablesPage();
