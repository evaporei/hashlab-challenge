const express = require('express')
const middlewares = require('../middlewares')

const createApp = () => {
  const app = express()

  middlewares.setupDefault(app)

  return app
}

module.exports = {
  createApp
}
