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
    if (user.firstName) this.firstNameInput.type(user.firstName);
    if (user.lastName) this.lastNameInput.type(user.lastName);
    if (user.email) this.emailInput.type(user.email);
    if (user.age) this.ageInput.type(user.age);
    if (user.salary) this.salaryInput.type(user.salary);
    if (user.department) this.departmentInput.type(user.department);
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

  get form() {
    return cy.get("#userForm");
  }
  get closeModalButton() {
    return cy.get("button[aria-label='Close']");
  }

  closeModal() {
    this.closeModalButton.click();
  }

  verifyFieldInvalid(selector) {
    cy.get(`${selector}:invalid`).should("exist");
  }

  verifyValidationShown() {
    this.form.should("have.class", "was-validated");
    cy.get(".modal-content").should("be.visible"); // modal stays open
  }

  verifyUserNotInTable(text) {
    cy.contains('[role="row"]', text).should("not.exist");
  }
}

export default new WebTablesPage();
