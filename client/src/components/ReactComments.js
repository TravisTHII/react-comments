import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../context/GlobalState'
import { ThreadProvider } from '../context/ThreadState'

import { SelectUser } from './SelectUser'
import { Thread } from './Thread'

import { Spinner } from './includes/Spinner'

export function ReactComments() {

	const { state: { loading, fetched }, getUsers } = useContext(GlobalContext)

	useEffect(() => {

		getUsers()

	}, [])

	let content

	if (loading) {

		content =
			<Spinner style={{ display: 'block', margin: '0 auto', paddingTop: '50px' }} />

	} else if (fetched) {

		content =
			<>
				<div className="rc_top flex-ui">
					<SelectUser />
				</div>
				<ThreadProvider thread="604ab2c196cae0233adb0fa9">
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