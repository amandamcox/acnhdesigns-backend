const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
	getAllService,
	getUserByIdService,
	getUserByUsernameService,
	createNewUserService,
} = require('./service')

// Helper for tokens
const createToken = (username, id) => {
	const tokenData = {
		username,
		id,
	}
	return jwt.sign(tokenData, process.env.SECRET)
}

const getAll = async (req, res, next) => {
	try {
		const users = await getAllService()
		res.json(users)
	} catch (error) {
		next(error)
	}
}

const getUser = async (req, res, next) => {
	try {
		const user = await getUserByIdService(req.params.userId)
		res.json(user)
	} catch (error) {
		next(error)
	}
}

const createNewUser = async (req, res, next) => {
	try {
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
		const savedUser = await createNewUserService(req.body, passwordHash)
		const token = createToken(savedUser.username, savedUser._id)
		res.status(200).send({
			token,
			username: savedUser.username,
			name: savedUser.name,
		})
	} catch (error) {
		next(error)
	}
}

const loginUser = async (req, res, next) => {
	try {
		const user = await getUserByUsernameService(req.body.username)
		const passwordCorrect =
			user === null
				? false
				: await bcrypt.compare(req.body.password, user.passwordHash)
		if (!(user && passwordCorrect)) {
			return res.status(401).json({
				error: 'Invalid username or password',
			})
		}
		const token = createToken(user.username, user._id)
		res.status(200).send({
			token,
			username: user.username,
			name: user.name,
		})
	} catch (error) {
		next(error)
	}
}

module.exports = { getAll, getUser, createNewUser, loginUser }
