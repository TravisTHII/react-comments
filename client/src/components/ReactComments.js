import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../context/GlobalState'
import { ThreadProvider } from '../context/ThreadState'

import { SelectUser } from './thread/SelectUser'
import { SelectThread } from './thread/SelectThread'
import { Thread } from './Thread'

import { Spinner } from './includes/Spinner'

export function ReactComments() {

	const { state: { thread, loading, fetched }, getSelectors } = useContext(GlobalContext)

	useEffect(() => {
		getSelectors()
	}, [])

	let content

	if (loading) {

		content =
			<Spinner style={{ display: 'block', margin: '0 auto', paddingTop: '50px' }} />

	} else if (fetched) {

		content =
			<>
				<div className="thread_components flex-ui">
					<SelectUser />
					<SelectThread />
				</div>
				<ThreadProvider thread={thread}>
					<Thread />
				</ThreadProvider>
			</>

	}

	return (
		<>
			{content}
		</>
	)
}