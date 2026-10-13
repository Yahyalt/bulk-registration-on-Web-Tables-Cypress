# Bulk Registration on Web Tables (Cypress)

Cypress automation for the DemoQA Web Tables page (https://demoqa.com/webtables). It registers many users in one run using data from a CSV file, and covers negative form validation scenarios. Built with the Page Object Model (POM).

## Scope

1. Bulk insert users into the Web Tables page, data read from a CSV file
2. Negative scenarios: invalid form input must show validation and must not save the data

## Tech Stack

1. Cypress
2. PapaParse (CSV parsing)
3. JavaScript (Node.js)

## Project Structure

```
.
├── cypress
│   ├── e2e
│   │   └── webtables
│   │       ├── bulk-register.cy.js        # bulk insert from CSV
│   │       └── negative-register.cy.js    # negative scenarios
│   ├── fixtures
│   │   ├── users.csv                      # valid users for bulk insert
│   │   └── users_invalid.json             # data for negative scenarios
│   └── support
│       ├── pages
│       │   └── WebTablesPage.js           # Page Object
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

## Prerequisites

1. Node.js 18 or newer
2. npm
3. Chrome or Edge (recommended)

## Installation

```
git clone <repository-url>
cd bulk-registration-on-Web-Tables-Cypress
npm install
```

If Cypress complains that the binary is missing (npm can block install scripts):

```
npx cypress install
npx cypress verify
```

## Configuration

`cypress.config.js` sets the base URL so tests can use relative paths:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    specPattern: "cypress/e2e/**/*.cy.js",
  },
});
```

## Test Data

### Valid users: `cypress/fixtures/users.csv`

```
firstName,lastName,email,age,salary,department
Budi,Santoso,budi.santoso@mail.com,28,5000,QA
Siti,Rahma,siti.rahma@mail.com,31,6500,Engineering
Andi,Pratama,andi.pratama@mail.com,25,4500,Finance
Dewi,Lestari,dewi.lestari@mail.com,35,8000,Legal
Rizky,Hakim,rizky.hakim@mail.com,29,5500,Product
```

Header names must match the form fields. No spaces after commas. Add more rows to insert more users.

### Invalid users: `cypress/fixtures/users_invalid.json`

Holds one entry per negative scenario (`emptyEmail`, `alphaAge`, `emptySalary`).

## Test Scenarios

### Bulk registration (`bulk-register.cy.js`)

1. Read `users.csv` with `cy.readFile`
2. Parse it with PapaParse (`header: true`)
3. For each row: open the Add form, fill it, submit
4. Assert each new user appears in the table

### Negative registration (`negative-register.cy.js`)

| Scenario | Expected result |
| --- | --- |
| Email field left empty | Form validation shown, user not saved to the table |
| Age field filled with letters | Form validation shown, user not saved to the table |
| Salary field left empty | Form validation shown, user not saved to the table |

Notes:

1. The Age input is `type="number"`, so the browser rejects letters and the field stays empty. Validation then fails on the required rule.
2. Validation on this form is native HTML5. Assertions check the `:invalid` state of the field and the `was-validated` class on the form, not an error text.
3. Each test reloads the page in `beforeEach`, so tests are independent.

## Page Object Model

All locators and UI actions live in `cypress/support/pages/WebTablesPage.js`. Specs only call methods and contain no selectors.

Main methods:

1. `visit()`
2. `openAddForm()`
3. `fillForm(user)` (skips empty values so blank fields stay blank)
4. `submit()`
5. `addUser(user)`
6. `verifyUserInTable(user)`
7. `verifyUserNotInTable(text)`
8. `verifyFieldInvalid(selector)`
9. `verifyValidationShown()`
10. `closeModal()`

If DemoQA changes a selector, fix it in this one file.

## Running the Tests

Interactive mode:

```
npx cypress open
```

Choose E2E Testing, pick a browser, then click a spec.

Headless, all specs:

```
npx cypress run
```

Headless, one spec:

```
npx cypress run --spec cypress/e2e/webtables/bulk-register.cy.js
npx cypress run --spec cypress/e2e/webtables/negative-register.cy.js
```

Specific browser:

```
npx cypress run --browser chrome
```


## Author

Yahya, QA Automation Engineer
