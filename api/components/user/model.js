const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: false,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	designs: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Design',
		},
	],
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject.passwordHash
		delete returnedObject.__v
		delete returnedObject._id
	},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
