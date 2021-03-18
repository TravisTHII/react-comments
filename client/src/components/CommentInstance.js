import React from 'react'

import { CommentProvider } from '../context/CommentState'

import { Comment } from './comment/Comment'

export function CommentInstance({ comment }) {
	return (
		<CommentProvider comment={comment}>
			<Comment />
		</CommentProvider>
	)
}