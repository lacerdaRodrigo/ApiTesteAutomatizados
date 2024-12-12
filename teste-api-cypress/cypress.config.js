const { defineConfig } = require("cypress");

const { connect } = require('./cypress/support/mongo');
const { Collection } = require("mongodb");

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // implement node event listeners here

      const db = await connect()

      on('task', {
        async deleteUser(id) {
          const users = db.collection('users')
          await users.deleteMany({ id: id })

          return null
        }
      })
    },
    baseUrl: 'http://localhost:5000'
  },
});
