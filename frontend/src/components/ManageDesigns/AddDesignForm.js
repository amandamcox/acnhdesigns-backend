import React, { useState } from 'react'
import { uploadImage, saveNewDesign } from './service'

const AddDesignForm = () => {
	const [name, setName] = useState('')
	const [category, setCategory] = useState('')
	const [creatorId, setCreatorId] = useState('')
	const [designId, setDesignId] = useState('')
	const [image, setImage] = useState('')
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')

	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtYW5kYSIsImlkIjoiNWVhYjMyMTNiOTQ1M2NhYWE5ZWNhMTdmIiwiaWF0IjoxNTg4OTcxMjk5fQ.-avAUs4NgIXpg49NekhyGp1i4t53cgFCHS91YAzdCNU'

	const categoryTypes = [
		'Paths',
		'Patterns',
		'Landscaping',
		'Decor',
		'Art',
		'Flags',
		'Sign',
		'Clothing',
		'Stalls',
	]

	const onSubmit = async () => {
		const imageData = new FormData()
		imageData.append('designImage', image)
		const uploadRes = await uploadImage(imageData)

		if (uploadRes) {
			const designObj = {
				name,
				category,
				creatorId,
				designId,
				image: uploadRes.imageLocation,
			}
			const res = await saveNewDesign(token, designObj)
			if (res) {
				setMessage('Success! Your design was added to the gallery!')
				setName('')
				setCategory('')
				setDesignId('')
				setImage('')
			} else {
				setError('Whoops! Something went wrong. Try again?')
			}
		}
	}

	return (
		<article>
			<h2>Add Your Design</h2>
			{message && <h4 className='user-message'>{message}</h4>}
			{error && <h4 className='error-message'>{error}</h4>}
			<label>
				Design Name:
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</label>
			<label>
				Design Category:
				<select
					value={category}
					onChange={e => setCategory(e.target.value)}
				>
					<option>Select One...</option>
					{categoryTypes.map(category => (
						<option value={category} key={category}>
							{category}
						</option>
					))}
				</select>
			</label>
			<label>
				ACNH Creator Id:
				<input
					type='text'
					value={creatorId}
					onChange={e => setCreatorId(e.target.value)}
				/>
			</label>
			<label>
				ACNH Design Id:
				<input
					type='text'
					value={designId}
					onChange={e => setDesignId(e.target.value)}
				/>
			</label>
			<label>
				Design Image:
				<input
					type='file'
					onChange={e => setImage(e.target.files[0])}
				/>
			</label>
			<button onClick={onSubmit}>Add Design</button>
		</article>
	)
}

export default AddDesignForm
