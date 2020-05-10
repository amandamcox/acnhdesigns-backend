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

const getUserByUsernameService = async username => {
	try {
		return await User.findOne({ username })
	} catch (error) {
		throw error
	}
}

const createNewUserService = async (req, passwordHash) => {
	try {
		const userObj = new User({
			username: req.username,
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
	getUserByUsernameService,
	createNewUserService,
}
