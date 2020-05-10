// import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'

// const Login = () => {
// 	const [username, setUsername] = useState('')
// 	const [password, setPassword] = useState('')

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
// 			// TO DO: Display error on page
// 			// PLACEHOLDER....
// 			alert('Login failed. Please try again.')
// 		}
// 	}, [hasError])

// 	const handleLogin = async (event) => {
// 		event.preventDefault()
// 		try {
// 			dispatch(tryLogin({ username, password }))
// 			setUsername('')
// 			setPassword('')
// 		} catch (error) {
// 			alert(error)
// 		}
// 	}

// 	return (
// 		<div className='auth-pages-container'>
// 			<h1 className='header-base'>Login</h1>
// 			<form onSubmit={handleLogin} className='form'>
// 				<div>
// 					<label>
// 						Username:
// 						<input
// 							type='text'
// 							value={username}
// 							name='username'
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
// 							name='password'
// 							onChange={(e) => setPassword(e.target.value)}
// 						/>
// 					</label>
// 				</div>
// 				<div className='button-container'>
// 					<button type='submit' className='clickable'>
// 						Login
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }

// export default Login
