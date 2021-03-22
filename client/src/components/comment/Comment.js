import React, { useContext, useRef } from 'react'

import { ThreadContext } from '../../context/ThreadState'
import { CommentContext } from '../../context/CommentState'

import { Header } from './Header'
import { Content } from './Content'
import { Actions } from './Actions'
import { Reply } from './Reply'
import { Replies } from './Replies'

import { Menu } from '../thread/Menu'

import { Spinner } from '../includes/Spinner'

export function Comment() {

	const { state: { menu: { display, commentRef: ref } } } = useContext(ThreadContext)

	const { state: { deleteLoad } } = useContext(CommentContext)

	const commentRef = useRef()

	const comment =
		<div className="comment" ref={commentRef}>
			<div className="comment_post">
				<Header refrence={commentRef} />
				<Content />
				<Actions />
				<Reply />
			</div>
			<Replies />
		</div>

	return (
		<>
			{(display && ref === commentRef.current) &&
				<Menu deleteRef={commentRef} />
			}

			{deleteLoad
				? <div><Spinner style={{ display: 'block', margin: '0 auto' }} /></div>
				: comment
			}
		</>
	)
}