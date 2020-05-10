import axios from 'axios'

const createAccount = async credentials => {
	try {
		const res = await axios.post('/api/users', credentials)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

const login = async credentials => {
	try {
		const res = await axios.post('/api/users/login', credentials)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export default { createAccount, login }
