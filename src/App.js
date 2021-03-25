import React from 'react'

import { GlobalProvider } from './context/GlobalState'

import { ReactComments } from './components/ReactComments'

import './style/index.css'
import './style/App.css'

export function App() {
	return (
		<div className="App">
			<div id="Main">
				<GlobalProvider>
					<ReactComments />
				</GlobalProvider>
			</div>
		</div>
	)
}