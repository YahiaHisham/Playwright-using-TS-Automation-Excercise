# Playwright Automation Exercise using TypeScript

## Project Description
this project I used to practice playwright using typescript and for reporting I used HTML and Allure reporting with Page Object Model design pattern.

## Table of Contents
- [System requirements](#system-requirements)
- [Installation](#installation)
- [Running Tests](#running-yests)
- [Project Structure](#project-structure)
- [Author](#author)

## System requirements
- [Node.js 18+ - Click To Download](https://nodejs.org/en/download/package-manager/current)
- Windows 10+, Windows Server 2016+ or Windows Subsystem for Linux (WSL).
- macOS 13 Ventura, or later.
- Debian 12, Ubuntu 22.04, Ubuntu 24.04, on x86-64 and arm64 architecture
## Installation

To install the necessary dependencies, run the following command:

```
npm install
```

## Running Tests

To run the tests, use the following command:

```
npx playwright test
```
To run the tests and auto generate Allure report after execution use the following command:

```
npm run test
```

To run the tests with the UI, use the following command:

```
npx playwright test --ui
```
To run the tests for with specific tag:

```
npx playwright test --grep "@smoke"
```
### Generating Reports

To generate a report, use the following command:

```
npm run report
```
## Project Structure

```plaintext
project-root/
├── pages/                   # Contains all the pages with it's locators and actions
├── tests/                   # Test files
│   ├── data/                # All test data used in test cases
│   │   ├── images/          # Images used in testing data
│   │   ├── jsonFiles/       # Json files that contains test data
│   ├── testClasses/         # Test files that contains test cases
│   └── utilities/           # utilities classes that supports test cases execution
├── package.json             # Manages the project's metadata, dependencies, and scripts.
├── playwright.config        # Configuration for Playwright tests, including settings for browsers, test timeouts, retries, and reporting.
├── README.md                # Project documentation
└── .gitignore               # Git ignore rules
```

## Author
This project is maintained by:

**Yahia Hisham**  
*Senior Software Test Automation Engineer*  
Based in Cairo, Egypt  

Feel free to reach out for inquiries or contributions:  
- **Email**: [yahia.hisham65@gmail.com](mailto:yahia.hisham65@gmail.com)  
- **LinkedIn**: [Yahia Hisham](https://www.linkedin.com/in/yahia-hisham/)  
- **GitHub**: [Yahia Hisham](https://github.com/YahiaHisham)  
