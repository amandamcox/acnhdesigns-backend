const Design = require('./model')
const User = require('../user/model')

const getDesignsService = async () => {
	try {
		return await Design.find({})
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
			user: user._id,
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
				user: user._id,
			})
		})
		const savedBulkDesigns = await Design.insertMany(bulkDesignObj, {
			ordered: false,
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
		return await Design.findByIdAndDelete(id)
	} catch (error) {
		throw error
	}
}

const updateDesignService = async (id, changes) => {
	try {
		return await Design.findByIdAndUpdate(id, changes, {
			new: true,
			select: '-user -__v',
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
					select: '-user -__v',
				}
			)
		} else if (vote === 'down') {
			return await Design.findByIdAndUpdate(
				id,
				{ $inc: { downvotes: 1 } },
				{
					new: true,
					select: '-user -__v',
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
	createNewDesignService,
	bulkNewDesignService,
	deleteDesignService,
	updateDesignService,
	updateVotesService,
}
