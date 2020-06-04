const logger = require('./logger')

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Status:', res.statusCode)
	logger.info('Path:', req.path)
	logger.info('Params:', req.params)
	if (req.body.password) {
		logger.info('Body:', `email: ${req.body.email}`)
	} else {
		logger.info('Body:', req.body)
	}
	logger.info('Referrer:', req.headers.host)
	logger.info('---')
	next()
}

module.exports = requestLogger
