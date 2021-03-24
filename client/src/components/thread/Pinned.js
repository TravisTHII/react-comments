import React, { useContext, useEffect } from 'react'

import { ThreadContext } from '../../context/ThreadState'

import { CommentInstance } from '../CommentInstance'

import { Spinner } from '../includes/Spinner'

export function Pinned() {

	const {
		state: {
			pinned: {
				pinned_id,
				hasPinned,
				useInitialPinned,
				useLocalPinned,
				loading,
				comment
			}
		},
		getPinnedComment
	} = useContext(ThreadContext)

	let content

	useEffect(() => {
		if (useLocalPinned)
			getPinnedComment()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pinned_id, useLocalPinned])

	if (loading) {

		content =
			<div>
				<Spinner style={{ display: 'block', margin: '0 auto' }} />
			</div>

	} else if (comment) {

		content =
			<CommentInstance
				comment={comment}
			/>

	}

	return (
		<>
			{useInitialPinned
				? <CommentInstance comment={comment} />
				: hasPinned && content
			}
		</>
	)
}