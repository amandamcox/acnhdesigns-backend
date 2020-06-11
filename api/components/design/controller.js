const jwt = require('jsonwebtoken')
const {
	getDesignsService,
	getDesignsByUserService,
	getDesignsBySearchService,
	createNewDesignService,
	bulkNewDesignService,
	deleteDesignService,
	updateDesignService,
	updateVotesService
} = require('./service')

// Helper for validating tokens from requests
const validateToken = req => {
	const auth = req.get('authorization')
	if (auth && auth.toLowerCase().startsWith('bearer ')) {
		const token = auth.substring(7)
		try {
			return jwt.verify(token, process.env.SECRET)
		} catch (error) {
			return null
		}
	}
	return null
}

const getDesigns = async (req, res, next) => {
	try {
		let { page, limit, category } = req.query
		if (page) page = parseInt(page)
		if (limit) limit = parseInt(limit)
		const allDesigns = await getDesignsService(page, limit, category)
		res.json(allDesigns)
	} catch (error) {
		next(error)
	}
}

const getDesignsBySearch = async (req, res, next) => {
	try {
		let { q, page, limit } = req.query
		if (page) page = parseInt(page)
		if (limit) limit = parseInt(limit)
		const results = await getDesignsBySearchService(q, page, limit)
		res.json(results)
	} catch (error) {
		next(error)
	}
}

const getDesignsForUser = async (req, res, next) => {
	const decodedToken = validateToken(req)
	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid or Missing Token' })
	}
	try {
		const designs = await getDesignsByUserService(decodedToken.id)
		res.json(designs)
	} catch (error) {
		next(error)
	}
}

const createNewDesign = async (req, res, next) => {
	const decodedToken = validateToken(req)
	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid or Missing Token' })
	}
	try {
		const savedDesign = await createNewDesignService(
			req.body,
			decodedToken.id
		)
		res.json(savedDesign)
	} catch (error) {
		next(error)
	}
}

const bulkNewDesigns = async (req, res, next) => {
	const decodedToken = validateToken(req)
	if (!decodedToken) {
		return res.status(401).json({ error: 'Invalid or Missing Token' })
	}
	try {
		const newBulkDesigns = await bulkNewDesignService(
			req.body.designs,
			decodedToken.id
		)
		res.json(newBulkDesigns)
	} catch (error) {
		next(error)
	}
}

const deleteDesign = async (req, res, next) => {
	try {
		const deletedDesign = await deleteDesignService(req.params.designId)
		deletedDesign ? res.status(204).end() : res.status(404).end()
	} catch (error) {
		next(error)
	}
}

const updateDesign = async (req, res, next) => {
	try {
		const updatedDesign = await updateDesignService(
			req.params.designId,
			req.body
		)
		updatedDesign ? res.json(updatedDesign) : res.status(404).end()
	} catch (error) {
		next(error)
	}
}

const uploadImage = (req, res, next) => {
	try {
		res.json({
			status: 'Upload Successful',
			imageLocation: req.file.location
		})
	} catch (error) {
		next(error)
	}
}

const updateVotes = async (req, res, next) => {
	try {
		const updatedVotes = await updateVotesService(
			req.params.designId,
			req.params.vote
		)
		updatedVotes ? res.json(updatedVotes) : res.status(404).end()
	} catch (error) {
		next(error)
	}
}

module.exports = {
	getDesigns,
	getDesignsForUser,
	getDesignsBySearch,
	createNewDesign,
	bulkNewDesigns,
	deleteDesign,
	updateDesign,
	uploadImage,
	updateVotes
}
