import React, { useEffect } from 'react'

import { useGlobalContext } from '../../context/Global'
import { ThreadProvider } from '../../context/Thread'

import { Thread, SelectUser, SelectThread } from '../Thread'

import { SelectorSkeleton } from '../skeleton/SelectorSkeleton'

export function ReactComments() {

	const { thread, token, loading, fetched, getSelectors } = useGlobalContext()

	useEffect(() => {
		getSelectors()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	window.onbeforeunload = () => { window.scrollTo(0, 0) }

	let content

	if (loading) {

		content =
			<SelectorSkeleton />

	} else if (fetched) {

		content =
			<>
				<div className="thread_components">
					<SelectUser />
					<SelectThread />
				</div>
				<ThreadProvider thread={thread} token={token}>
					<Thread />
				</ThreadProvider>
			</>

	}

	return (
		<div className="App">
			<div id="Main">
				{content}
			</div>
		</div>
	)
}