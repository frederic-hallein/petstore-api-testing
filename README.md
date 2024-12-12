# Petstore API Testing
## Description
[Petstore](https://petstore.swagger.io/) is a sample API that simulates a pet shop management server. 
The API allows you to access Petstore data using a set of individual calls. There are three endpoint groups namely Pet, Store and User. 
In this repository, all test cases are written using Playwright.

## How To Install & Run
1. Install Playwright by running the command:
```bash
npm init playwright@latest
```

2. To update Playwright to the latest version, run the following command:
```bash
npm install -D @playwright/test@latest
```
   To check which version of Playwright is installed, you can run the following command:
```bash
npx playwright --version
```

3. To clone the repository, run the following command:
```bash
git clone https://github.com/frederic-hallein/petstore-api-testing
```

4. To run the project, go inside the `petstore-api-testing/` folder and use the following command:
```bash
npx playwright test
```

To run your tests in headed mode, use the `--headed` flag

## Test Cases

https://trello.com/b/tgVgvFkN/petstore-api-testing
