const User = require('./model')

const getAllService = async () => {
	try {
		return await User.find({})
	} catch (error) {
		throw error
	}
}

const getUserByIdService = async userId => {
	try {
		return await User.findById(userId)
	} catch (error) {
		throw error
	}
}

const getUserByEmailService = async email => {
	try {
		return await User.findOne({ email })
	} catch (error) {
		throw error
	}
}

const createNewUserService = async (req, passwordHash) => {
	try {
		const userObj = new User({
			email: req.email,
			name: req.name,
			passwordHash,
		})
		const newUser = await userObj.save()
		return newUser
	} catch (error) {
		throw error
	}
}

module.exports = {
	getAllService,
	getUserByIdService,
	getUserByEmailService,
	createNewUserService,
}
