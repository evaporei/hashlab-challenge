const express = require('express')
const middlewares = require('../middlewares')
const { setupRoutes } = require('../routes')

const createApp = () => {
  const app = express()

  middlewares.setupDefault(app)

  setupRoutes(app)

  app.use(middlewares.globalErrorHandler)

  return app
}

module.exports = {
  createApp
}
