import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalState'

import { Header } from './components/Header'
import { ReactComments } from './components/ReactComments'
import { NotFound } from './components/NotFound'

import './style/index.css'
import './style/App.css'

export function App() {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/">
					<GlobalProvider>
						<ReactComments />
					</GlobalProvider>
				</Route>
				<Route component={NotFound} />
			</Switch>
		</Router>
	)
}