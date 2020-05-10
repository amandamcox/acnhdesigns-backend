import React from 'react'

const RatingButton = ({ result, icon, onClick }) => {
	const onRate = designId => {
		onClick(designId)
	}

	return (
		<a
			className='right small-right-margin'
			onClick={() => onRate(result.id)}
		>
			<div className='chip rate-chip'>
				<i className='material-icons'>{icon}</i>
				<span>
					{icon === 'thumb_down' ? result.downvotes : result.upvotes}
				</span>
			</div>
		</a>
	)
}

export default RatingButton
