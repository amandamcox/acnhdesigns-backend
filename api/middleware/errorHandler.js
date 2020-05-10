const logger = require('./logger')

const handleError = (error, req, res, next) => {
	const { name, message, kind, stack } = error
	let statusCode = 500
	let reason = ''

	if (name === 'CastError' && kind === 'ObjectId') {
		statusCode = 400
		reason = 'Malformatted Id'
	} else if (name === 'JsonWebTokenError') {
		statusCode = 400
		reason = 'Invalid Token'
	} else if (name === 'ValidationError') {
		statusCode = 400
		reason = 'Malformatted or Non-Unique Payload'
	}

	if (statusCode >= 400 && statusCode < 500) {
		logger.warn('WARN:', stack)
	} else {
		logger.error('ERROR:', stack)
	}

	res.status(statusCode).json({
		status: 'Error',
		statusCode,
		reason,
		message,
	})

	next(error)
}

module.exports = handleError
