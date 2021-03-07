import React from 'react'

import { GlobalProvider } from './context/GlobalState'
import { ThreadProvider } from './context/ThreadState'

import { Thread } from './components/Thread'

import './style/index.css'
import './style/App.css'

export function App() {
	return (
		<div className="App">
			<div id="Main">
				<GlobalProvider>
					<ThreadProvider thread="60441afc7505b1ec9a6ea667">
						<Thread />
					</ThreadProvider>
				</GlobalProvider>
			</div>
		</div>
	)
}