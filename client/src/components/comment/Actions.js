import React, { useContext } from 'react'

import { CommentContext } from '../../context/CommentState'

export function Actions() {

	const { state: { showReplies, isReplying }, comment: { reply }, getReplies, openReply } = useContext(CommentContext)

	const plural = reply.total > 1 ? 'replies' : 'reply'

	return (
		<div className="comment_actions">
			{reply.hasReplies &&
				<button
					type="button"
					className={`cmt_btn${showReplies ? ' cmt_active' : ''}`}
					onClick={() => getReplies()}
				>
					{showReplies ? `Hide ${plural}` : `View ${reply.total} ${plural}`}
				</button>
			}

			<button
				type="button"
				className={`cmt_btn${isReplying ? ' cmt_active' : ''}`}
				onClick={() => openReply()}
			>
				Reply
		</button>
		</div>
	)
}