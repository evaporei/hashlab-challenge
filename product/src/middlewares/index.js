const cors = require('cors')

const setupDefault = app =>
  app.use(cors())

module.exports = { setupDefault }
