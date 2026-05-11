const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'z4kz4v',
  e2e: {
    baseUrl: 'https://teste-colmeia-qa.colmeia-corp.com/',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false
  },
});