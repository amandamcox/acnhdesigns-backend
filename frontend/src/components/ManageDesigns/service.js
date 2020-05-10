import axios from 'axios'

export const uploadImage = async uploadedImage => {
	try {
		const res = await axios.post('/api/designs/upload', uploadedImage)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export const saveNewDesign = async (token, designObj) => {
	try {
		const headers = {
			headers: {
				Authorization: `bearer ${token}`,
			},
		}
		const res = await axios.post('/api/designs', designObj, headers)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}
