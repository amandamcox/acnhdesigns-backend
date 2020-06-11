const Design = require('./model')
const User = require('../user/model')
const { deleteImage } = require('../../../config/awsS3Config')

const paginateResults = async (filter = {}, page = 1, limit = 10) => {
	const skip = limit * (page - 1)
	let results = {}

	try {
		results.totalCount = await Design.find(filter).countDocuments()
		results.currentPage = page
		results.totalPages = Math.ceil(results.totalCount / limit)
		results.results = await Design.find(filter, null, {
			skip,
			limit
		}).sort('-upvotes')
		return results
	} catch (error) {
		throw error
	}
}

const getDesignsService = async (page, limit, category = null) => {
	try {
		if (category)
			return await paginateResults(
				{
					designCategory: category
				},
				page,
				limit
			)
		else return await paginateResults({}, page, limit)
	} catch (error) {
		throw error
	}
}

const getDesignsBySearchService = async (query, page, limit) => {
	try {
		return await paginateResults(
			{ designName: new RegExp(query, 'i') },
			page,
			limit
		)
	} catch (error) {
		throw error
	}
}

const getDesignsByUserService = async userId => {
	try {
		return await User.findById(userId, { select: 'designs' }).populate(
			'designs'
		)
	} catch (error) {
		throw error
	}
}

const createNewDesignService = async (req, userId) => {
	try {
		const user = await User.findById(userId)
		const lowercaseCategories = req.category.map(category =>
			category.toLowerCase()
		)
		const designObj = new Design({
			designName: req.name,
			designCategory: lowercaseCategories,
			creatorId: req.creatorId,
			customDesignId: req.designId.toLowerCase(),
			imageUrl: req.image,
			user: user._id
		})
		const savedDesign = await designObj.save()
		user.designs = [...user.designs, savedDesign._id]
		await user.save()
		return savedDesign
	} catch (error) {
		throw error
	}
}

const bulkNewDesignService = async (designsArr, userId) => {
	try {
		const user = await User.findById(userId)
		const bulkDesignObj = designsArr.map(design => {
			return new Design({
				designName: design.name,
				designCategory: design.category.toLowerCase(),
				creatorId: design.creatorId.toLowerCase(),
				customDesignId: design.designId.toLowerCase(),
				user: user._id
			})
		})
		const savedBulkDesigns = await Design.insertMany(bulkDesignObj, {
			ordered: false
		})
		const savedBulkDesignIds = savedBulkDesigns.map(design => design._id)
		user.designs = [...user.designs, ...savedBulkDesignIds]
		await user.save()
		return savedBulkDesigns
	} catch (error) {
		throw error
	}
}

const deleteDesignService = async id => {
	try {
		const deleteImageRes = await Design.findById(id, 'imageUrl').exec(
			deleteImage
		)
		return await Design.findByIdAndDelete(id)
	} catch (error) {
		throw error
	}
}

const updateDesignService = async (id, changes) => {
	try {
		return await Design.findByIdAndUpdate(id, changes, {
			new: true,
			select: '-user -__v'
		})
	} catch (error) {
		throw error
	}
}

const updateVotesService = async (id, vote) => {
	try {
		if (vote === 'up') {
			return await Design.findByIdAndUpdate(
				id,
				{ $inc: { upvotes: 1 } },
				{
					new: true,
					select: '-user -__v'
				}
			)
		} else if (vote === 'down') {
			return await Design.findByIdAndUpdate(
				id,
				{ $inc: { downvotes: 1 } },
				{
					new: true,
					select: '-user -__v'
				}
			)
		}
	} catch (error) {
		throw error
	}
}

module.exports = {
	getDesignsService,
	getDesignsByUserService,
	getDesignsBySearchService,
	createNewDesignService,
	bulkNewDesignService,
	deleteDesignService,
	updateDesignService,
	updateVotesService
}
