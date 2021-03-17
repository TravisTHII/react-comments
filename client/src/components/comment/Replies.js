import React, { useContext } from 'react'

import { CommentContext } from '../../context/CommentState'

import { CommentInstance } from '../CommentInstance'

import { Spinner } from '../includes/Spinner'

export function Replies() {

	const {
		state: {
			paging,
			results,
			loading,
			fetched,
			localReplies,
			showReplies,
			replyLoad,
			moreLoading
		},
		moreReplies
	} = useContext(CommentContext)

	let content

	const Loading =
		<Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto' }} />

	if (loading) {

		content = Loading

	} else if (fetched || localReplies) {

		content =
			results.map(c => (
				<CommentInstance key={`${c._id}`} comment={c} />
			))

	}

	return (
		<div className={`comment_replies${showReplies ? ' view_replies' : ''}`}>
			<div className="replies">
				{replyLoad && Loading}
				{content}
			</div>
			{(!paging.end && fetched) &&
				<div className="load_replies">
					{moreLoading
						? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '35px', height: '35px' }} />
						: <button className="cmt_btn" type="button" onClick={() => moreReplies()}>see more comments</button>
					}
				</div>
			}
		</div>
	)
}