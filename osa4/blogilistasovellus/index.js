const config = require('./utils/config')
const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const logger = require('./utils/logger')
require("dotenv").config()


const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})