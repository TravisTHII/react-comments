import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'
import { CommentProvider } from '../context/CommentState'

import { Comment } from './comment/Comment'

export function CommentInstance({ comment }) {

	const { state: { token } } = useContext(GlobalContext)

	return (
		<CommentProvider comment={comment} token={token}>
			<Comment />
		</CommentProvider>
	)
}