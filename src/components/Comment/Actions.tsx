import React from 'react'

import { useCommentContext } from '../../context/Comment'

export function Actions() {

	const { showReplies, isReplying, comment: { reply }, getReplies, openReply } = useCommentContext()

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