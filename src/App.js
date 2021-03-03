import React from 'react'

import { ThreadProvider } from './context/ThreadState'

import { Thread } from './components/Thread'

import './style/index.css'
import './style/App.css'

export function App() {
	return (
		<div className="App">
			<div id="Main">
				<ThreadProvider>
					<Thread />
				</ThreadProvider>
			</div>
		</div>
	)
}