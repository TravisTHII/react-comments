import React, { useContext, useEffect } from 'react'

import { ThreadContext } from '../context/ThreadState'

import { Header } from '../components/Header'
import { Poster } from '../components/Poster'

import { CommentInstance } from './CommentInstance'

import { Spinner } from './includes/Spinner'

export function Thread() {

	const { state, getThread } = useContext(ThreadContext)

	useEffect(() => {
		getThread()
	}, [])

	let content

	const Loading =
		<Spinner style={{ display: 'block', margin: '0 auto', paddingTop: '50px' }} />

	if (state.loading) {

		content = Loading

	} else {

		content =
			<>
				<Header />
				<Poster />
				<div className="thread">
					<div className="thread_comments">
						{state.comments.map(c => (
							<CommentInstance
								key={`${c.comment_id}`}
								comment={c}
							/>
						))}
					</div>
				</div>
			</>

	}

	return (
		<div className="thread-column">
			{content}
		</div>
	)
}