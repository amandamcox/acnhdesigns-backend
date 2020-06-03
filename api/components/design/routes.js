const designRouter = require('express').Router()
const {
	getDesigns,
	getDesignsForUser,
	getDesignsBySearch,
	createNewDesign,
	bulkNewDesigns,
	deleteDesign,
	updateDesign,
	uploadImage,
	updateVotes,
} = require('./controller')
const { upload } = require('../../../config/awsS3Config')

designRouter.get('/', getDesigns)
designRouter.get('/user', getDesignsForUser)
designRouter.get('/search', getDesignsBySearch)
designRouter.post('/', createNewDesign)
designRouter.post('/upload', upload.single('designImage'), uploadImage)
designRouter.post('/bulk', bulkNewDesigns)
designRouter.delete('/:designId', deleteDesign)
designRouter.patch('/:designId', updateDesign)
designRouter.post('/:designId/:vote', updateVotes)

module.exports = designRouter
