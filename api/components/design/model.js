const mongoose = require('mongoose')
const Schema = mongoose.Schema

const designSchema = new Schema({
	designName: {
		type: String,
		required: true,
	},
	designCategory: {
		type: Array,
		required: true,
	},
	creatorId: {
		type: String,
	},
	customDesignId: {
		type: String,
		required: true,
		unique: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	upvotes: {
		type: Number,
		default: 0,
	},
	downvotes: {
		type: Number,
		default: 0,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

designSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.__v
		delete returnedObject._id
	},
})

module.exports = mongoose.model('Design', designSchema)
