import axios from 'axios'

export const getAllDesigns = async () => {
	try {
		const res = await axios.get('/api/designs')
		return res.data
	} catch (error) {
		throw Error(error)
	}
}

export const rateDesign = async (id, vote) => {
	try {
		const res = await axios.post(`/api/designs/${id}/${vote}`)
		return res.data
	} catch (error) {
		throw Error(error)
	}
}
