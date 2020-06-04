const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
	getAllService,
	getUserByIdService,
	getUserByEmailService,
	createNewUserService,
} = require('./service')

// Helper for tokens
const createToken = (email, id) => {
	const tokenData = {
		email,
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
		const token = createToken(savedUser.email, savedUser._id)
		res.status(200).send({
			token,
			email: savedUser.email,
			name: savedUser.name,
		})
	} catch (error) {
		next(error)
	}
}

const loginUser = async (req, res, next) => {
	try {
		const user = await getUserByEmailService(req.body.email)
		const passwordCorrect =
			user === null
				? false
				: await bcrypt.compare(req.body.password, user.passwordHash)
		if (!(user && passwordCorrect)) {
			return res.status(401).json({
				error: 'Invalid email or password',
			})
		}
		const token = createToken(user.email, user._id)
		res.status(200).send({
			token,
			email: user.email,
			name: user.name,
		})
	} catch (error) {
		next(error)
	}
}

module.exports = { getAll, getUser, createNewUser, loginUser }
