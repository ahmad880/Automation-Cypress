const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Volopa Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    retries:{
      runMode: 1,
      openMode: 0
    },
    baseUrl : "https://uiredevelopment.volopa.com/login",
    "pageLoadTimeout" : 100000,
    "defaultCommandTimeout" : 1000000,
    chromeWebSecurity: false,
    //video: true,
    //videoCompression: 15,
  },
  
});
