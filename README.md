# BookStack Demo – QA Testing Project

## Project Overview

This project contains manual functional testing documentation and Selenium automation tests for the BookStack Demo application.

**Application:** https://demo.bookstackapp.com/

## Project Objectives

- Test key BookStack workflows such as login, book creation, editing, and search.
- Cover positive, negative, boundary, and edge test scenarios.
- Automate selected repeatable workflows using Selenium WebDriver.
- Document test results, observations, and supporting evidence.

## Tools and Technologies

- JavaScript
- Selenium WebDriver
- Mocha
- Node.js and npm
- Google Chrome
- Microsoft Excel
- Visual Studio Code

## Project Structure

```text
BookStack-QA-Assignment/
├── Bug Report/
│   ├── BUG-001.md
│   ├── BUG-001-Language-Not-Saved.png
│   └── BUG-001-Permission-Error.png
├── Evidence/
│   ├── Automation-Test- part 1 Execution.png
│   └── Automation-Test-part 2 Execution.png
├── tests/
│   └── bookstack.test.js
├── Automation-Test-Cases.xlsx
├── Functional-Test-Cases.xlsx
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

**Note:** `.env` and `node_modules/` are local setup files and are excluded from the public repository using `.gitignore`.

## Manual Testing

The functional test case workbook contains 18 test cases covering:

- Login
- Book creation
- Book editing
- Search
- Positive scenarios
- Negative scenarios
- Boundary scenarios
- Edge scenarios

See **Functional-Test-Cases.xlsx** for test steps, expected results, actual results, and test status.

## Automation Testing

Three scenarios are automated using Selenium WebDriver in `tests/bookstack.test.js`:

1. Login with valid credentials.
2. Create a book with valid details.
3. Search for an existing book.

See **Automation-Test-Cases.xlsx** for test objectives, preconditions, steps, expected results, actual results, and automation rationale.

## Prerequisites

- Node.js and npm installed
- Google Chrome installed
- Internet connection
- Valid BookStack Demo credentials

## Setup Instructions

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Create a local `.env` file in the project root:

```env
BOOKSTACK_URL=https://demo.bookstackapp.com
BOOKSTACK_EMAIL=your_demo_email
BOOKSTACK_PASSWORD=your_demo_password
```

Replace the example values with valid demo credentials. Never upload or publish the `.env` file or actual passwords.

## Run Automation Tests

Run the complete test suite using:

```bash
npm test
```

The search test uses the book created by the preceding create-book test. Therefore, run the complete suite together so the required test data exists.

## Test Execution Summary

In the recorded automation execution, **3 automation tests passed**:

- Valid login
- Book creation
- Book search

Execution screenshots are available in the `Evidence/` folder.

Manual test results and observations are documented in the functional test workbook.

## Environment Limitation

The BookStack Demo environment automatically resets its database and image storage periodically (approximately every 30 minutes, as observed during this assignment). Therefore, test data may disappear, and data-dependent tests may need to be executed again.

## Bug Hunting and Exploratory Testing

Exploratory testing was performed on the BookStack Demo application to identify unexpected behavior and usability issues.

### Areas Explored

- Book creation, editing, and deletion
- Page creation, editing, copying, and deletion
- Search functionality
- Revision history
- User account preferences
- Permission handling

### Observations

- Book and page operations were tested with different inputs.
- Empty descriptions and special characters were explored.
- Delete confirmation and cancellation behavior were checked.
- A permission error was observed when attempting to update the preferred language.
- Some account and settings operations may be restricted in the demo environment.

### Bug Investigation

Observed behaviors were reviewed against expected functionality. Issues that could not be confirmed due to demo restrictions were documented as observations requiring further verification rather than confirmed defects.

## Bug Reporting

The observed preferred-language update issue and its supporting screenshots are documented in the `Bug Report/` folder.

The update attempt resulted in a permission error. However, the demo environment may restrict account updates, so this observation is marked as requiring verification rather than a confirmed application defect.

## Author

QA Practice Project