const routes = require('express').Router()
const userRouter = require('./components/user/routes')
const designRouter = require('./components/design/routes')

routes.get('/', (req, res) => {
	res.status(200).json({ message: 'Connected' })
})
routes.use('/users', userRouter)
routes.use('/designs', designRouter)

module.exports = routes
