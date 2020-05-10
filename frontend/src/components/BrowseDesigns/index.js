import React, { useState, useEffect } from 'react'
import { getAllDesigns, rateDesign } from './service'
import RatingButton from './RatingButton'
import './BrowseDesigns.css'

const BrowseDesigns = () => {
	const [results, setResults] = useState([])
	const [votes, setVotes] = useState(['1', '2'])

	useEffect(() => {
		const getDesigns = async () => {
			const results = await getAllDesigns()
			setResults(sortResults(results))
		}
		getDesigns()
	}, [])

	const sortResults = dataSet => {
		return dataSet.sort((a, b) => b.upvotes - a.upvotes)
	}

	const rateUp = async designId => {
		const updatedDesign = await rateDesign(designId, 'up')
		if (updatedDesign) {
			const dataWithoutUpdate = results.filter(
				result => result.id !== designId
			)
			const newResults = [...dataWithoutUpdate, updatedDesign]
			setResults(sortResults(newResults))
		}
		const allVotes = [...votes, designId]
		window.localStorage.setItem('designRated', JSON.stringify(allVotes))
		setVotes(allVotes)
	}

	const rateDown = async designId => {
		const updatedDesign = await rateDesign(designId, 'down')
		if (updatedDesign) {
			const dataWithoutUpdate = results.filter(
				result => result.id !== designId
			)
			const newResults = [...dataWithoutUpdate, updatedDesign]
			setResults(sortResults(newResults))
		}
	}

	return (
		<div>
			<div className='row'>
				<div className='col s12'>
					{results.map(result => (
						<div
							className='col s12 m6 l6'
							key={result.customDesignId}
						>
							<div className='card z-depth-3'>
								<div className='card-image'>
									<img
										src={result.imageUrl}
										alt={result.designName}
									/>
									<span className='card-title'>
										{result.designName}
									</span>
								</div>
								<div className='card-content'>
									<p>
										<span className='card-qualifier'>
											Design ID:
										</span>
										<span className='uppercase'>
											{result.customDesignId}
										</span>
									</p>
									<p>
										<span className='card-qualifier'>
											Creator ID:
										</span>
										<span className='uppercase'>
											{result.creatorId}
										</span>
									</p>
									{result.designCategory.map(category => (
										<div
											key={category}
											className='chip z-depth-1 purple lighten-3 capitialize card-category'
										>
											{category}
										</div>
									))}
								</div>
								<div className='card-action light-green lighten-5'>
									<a className='btn-floating waves-effect waves-light grey lighten-1'>
										<i className='material-icons'>
											favorite
										</i>
									</a>
									<RatingButton
										result={result}
										icon='thumb_down'
										onClick={rateDown}
									/>
									<RatingButton
										result={result}
										icon='thumb_up'
										onClick={rateUp}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default BrowseDesigns
