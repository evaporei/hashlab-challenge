const { startHttpServer } = require('js-commons/src/ports/http')
const setupDotenv = require('js-commons/src/config')
const { createApp } = require('../app')

setupDotenv()

const main = async () => {
  const app = createApp()

  startHttpServer(app)

  console.log('HTTP server started listening')
}

main()
  .catch(err => console.log('Failed to start HTTP server:', err))
