import React from 'react'
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import BrowseDesigns from '../BrowseDesigns'
import ManageDesigns from '../ManageDesigns'
import AddDesignForm from '../ManageDesigns/AddDesignForm'
import Login from '../Users/Login'
import CreateAccount from '../Users/CreateAccount'
import './App.css'

function App() {
	return (
		<div>
			<Router>
				<header>
					<nav>
						<div className='nav-wrapper'>
							<Link to='/' className='brand-logo'>
								CDDB
							</Link>
							<ul className='right hide-on-med-and-down'>
								<li>
									<NavLink to='/'>Home</NavLink>
								</li>
								<li>
									<NavLink to='/add'>Add Design</NavLink>
								</li>
								<li>
									<NavLink to='/dashboard'>
										Manage Designs
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/login'
										className='waves-effect waves-light btn'
									>
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										to='/createaccount'
										className='waves-effect waves-light btn purple darken-2'
									>
										Create Account
									</NavLink>
								</li>
							</ul>
						</div>
					</nav>
				</header>
				<div className='container'>
					<Switch>
						<Route path='/add'>
							<AddDesignForm />
						</Route>
						<Route path='/dashboard'>
							<ManageDesigns />
						</Route>
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/createaccount'>
							<CreateAccount />
						</Route>
						<Route exact path='/'>
							<BrowseDesigns />
						</Route>
					</Switch>
				</div>
				<footer className='page-footer'>
					<div className='container'>
						<div className='row'>
							<div className='col l6 s12'>
								<h5 className='white-text'>Like CDDB?</h5>
								<p className='grey-text text-lighten-4'>
									Support us by donating towards site
									maintenance costs!
								</p>
							</div>
							<div className='col l4 offset-l2 s12'>
								<h5 className='white-text'>Links</h5>
								<ul>
									<li>Browse Custom Designs</li>
									<li>Add New Custom Design</li>
									<li>Manage Your Custom Designs</li>
									<li>Contact Us</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='footer-copyright'>
						<div className='container'>
							© 2020 Custom Design Database (CDDB)
							<p className='grey-text text-lighten-4 right'>
								This website has no affiliation with Nintendo or
								Animal Crossing.
							</p>
						</div>
					</div>
				</footer>
			</Router>
		</div>
	)
}

export default App
