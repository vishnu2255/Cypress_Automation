Cypress Automation

## Prerequisites
- Install Node.js and npm on the machine from the npm registry

Verify if the node is installed successfully
`node -v`

## Installation
1. Clone the repository. 
2. Checkout `develop` branch
3. Run `npm install` to install all the required dependencies.

## Running Tests
1. Open Cypress Test Runner: 
`npx cypress open`
2. Select the tests file and run tests from GUI

or Run tests in Headless mode using following command
`npx cypress run`

## CI setup
Github Action workflow is setup to run the tests on CI for every push to the develop branch.
