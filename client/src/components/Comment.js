import React, { useRef } from 'react'

import { Header } from './comment/Header'
import { Content } from './comment/Content'
import { Actions } from './comment/Actions'
import { Reply } from './Reply'
import { Replies } from './comment/Replies'

export function Comment() {

	const commentRef = useRef()

	return (
		<div className="comment" ref={commentRef}>
			<div className="comment_post">

				<Header refrence={commentRef} />

				<Content />

				<Actions />

				<Reply />

			</div>

			<Replies />

		</div>
	)
}