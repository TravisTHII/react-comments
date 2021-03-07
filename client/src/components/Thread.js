import React, { useContext, useEffect } from 'react'

import { ThreadContext } from '../context/ThreadState'

import { Header } from '../components/Header'
import { Poster } from '../components/Poster'

import { CommentInstance } from './CommentInstance'

import { Spinner } from './includes/Spinner'

export function Thread() {

	const { state, getThread, loadMoreComments } = useContext(ThreadContext)

	useEffect(() => {
		getThread()
	}, [])

	let content
		, sorted

	const Loading =
		<Spinner style={{ display: 'block', margin: '0 auto', paddingTop: '50px' }} />

	if (state.loading) {

		content = Loading

	} else {

		if (state.sortLoad) {

			sorted = Loading

		} else {

			sorted =
				<div className="thread">
					<div className="thread_comments">

						{state.postLoad &&
							<Spinner stroke="#fff" style={{ display: 'block', margin: '10px auto' }} />
						}

						{state.comments.map(c => (
							<CommentInstance
								key={`${c.comment_id}`}
								comment={c}
							/>
						))}

					</div>

					{!state.paging.end &&
						<div className="load_comments">
							<button
								type="button"
								className={`enspr_red_btn${state.moreLoad ? ' disabled' : ''}`}
								disabled={state.moreLoad ? true : false}
								onClick={() => loadMoreComments()}
							>
								{!state.moreLoad
									? 'see more comments'
									: <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
								}
							</button>
						</div>
					}

				</div>

		}

		content =
			<>
				<Header />
				<Poster />
				{sorted}
			</>

	}

	return (
		<div className="thread-column">
			{content}
		</div>
	)
}