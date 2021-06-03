import React, { useRef } from 'react'

import { useThreadContext } from 'context/Thread'
import { useCommentContext } from 'context/Comment'

import {
	Header,
	Content,
	Edit,
	Actions,
	Reply,
	Replies
} from './'

import { Menu } from '../Thread/Menu'

import { Spinner } from '../Includes/Spinner'

export function Comment() {

	const { menu: { display, commentRef: ref } } = useThreadContext()

	const { isEditing, deleteLoad } = useCommentContext()

	const commentRef = useRef<HTMLDivElement>(null)

	const comment =
		<div className="comment" ref={commentRef}>
			<div className="comment_post">
				<Header refrence={commentRef} />
				{isEditing
					? <Edit />
					: <Content />
				}
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