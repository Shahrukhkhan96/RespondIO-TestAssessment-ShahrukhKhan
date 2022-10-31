const { defineConfig } = require('cypress')

module.exports = defineConfig({
  watchForFiles: false,
  video:false,
  screenshotOnRunFailure:false,
  reporter: 'cypress-mochawesome-reporter',
  failOnStatusCode: false,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://automationpractice.com/index.php',
  },
})
