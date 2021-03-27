import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalState'

import { ReactComments } from './components/ReactComments'
import { NotFound } from './components/NotFound'

import './style/index.css'
import './style/App.css'

export function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => (
					<GlobalProvider>
						<ReactComments />
					</GlobalProvider>
				)} />
				<Route component={NotFound} />
			</Switch>
		</Router>
	)
}