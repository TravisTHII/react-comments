import React, { useRef } from 'react'

import { Header } from './Header'
import { Content } from './Content'
import { Actions } from './Actions'
import { Reply } from './Reply'
import { Replies } from './Replies'

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