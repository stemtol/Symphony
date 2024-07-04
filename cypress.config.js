const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    "baseUrl": "https://jsonplaceholder.typicode.com",
    pageLoadTimeout: 120000
  },

})