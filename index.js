const express = require('express')
const app = express()
const http = require('http')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const { PORT, MONGODB_URI } = require('./config/config')
const logger = require('./api/middleware/logger')
const requestLogger = require('./api/middleware/requestLogger')
const handleError = require('./api/middleware/errorHandler')
const routes = require('./api/routes')

app.use(bodyParser.json())
app.use(cors())
app.use(compression())
app.use(express.static('build'))
app.use(requestLogger)
app.use('/api', routes)
app.use(handleError)

const server = http.createServer(app)
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`))

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => logger.info('Connected to MongoDB'))
	.catch(error => logger.error('Error connecting to MongoDB:', error.message))
