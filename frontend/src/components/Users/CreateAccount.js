// import React, { useState, useEffect } from 'react'
// import { Link, useHistory } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { tryCreateAccount } from './actions'
// import './auth.css'

// const CreateAccount = () => {
// 	const [username, setUsername] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [name, setName] = useState('')

// 	const userToken = useSelector((state) => state.auth.authObject)
// 	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
// 	const hasError = useSelector((state) => state.auth.error)
// 	const dispatch = useDispatch()
// 	let history = useHistory()

// 	useEffect(() => {
// 		if (isLoggedIn) {
// 			window.localStorage.setItem('workoutTracker', JSON.stringify(userToken))
// 			history.push('/track')
// 		}
// 	}, [isLoggedIn, userToken, history])

// 	useEffect(() => {
// 		if (hasError) {
// 			// TO DO: Display error on page with validation error if exists
// 			// PLACEHOLDER....
// 			alert('Account creation failed. Please try again.')
// 		}
// 	}, [hasError])

// 	const handleCreateAccount = async (event) => {
// 		event.preventDefault()
// 		try {
// 			dispatch(tryCreateAccount({ username, password, name }))
// 			setName('')
// 			setUsername('')
// 			setPassword('')
// 		} catch (error) {
// 			alert(`The username, ${username}, already exists. Please pick another one.`)
// 		}
// 	}

// 	return (
// 		<div className='auth-pages-container'>
// 			<h1 className='header-base'>Create an account</h1>
// 			<form className='form' onSubmit={handleCreateAccount}>
// 				<div>
// 					<label>
// 						Full Name:
// 						<input type='text' value={name} onChange={(e) => setName(e.target.value)} />
// 					</label>
// 				</div>
// 				<div>
// 					<label>
// 						Username:
// 						<input
// 							type='text'
// 							value={username}
// 							onChange={(e) => setUsername(e.target.value)}
// 						/>
// 					</label>
// 				</div>
// 				<div>
// 					<label>
// 						Password:
// 						<input
// 							type='password'
// 							value={password}
// 							onChange={(e) => setPassword(e.target.value)}
// 						/>
// 					</label>
// 				</div>
// 				<div className='button-container'>
// 					<button type='submit' className='clickable'>
// 						Create Account
// 					</button>
// 				</div>
// 			</form>
// 			<div className='info-message'>
// 				Already have an account? <Link to='/login'>Log in.</Link>
// 			</div>
// 		</div>
// 	)
// }

// export default CreateAccount
