import React, { useContext, useRef, useState } from 'react'

import { GlobalContext } from '../../context/GlobalState'
import { ThreadContext } from '../../context/ThreadState'

import { Badge } from '../includes/Badge'
import { Spinner } from '../includes/Spinner'

import { validText, expandTextarea } from '../../utils/functions'

export function Poster() {

	const { state: { user } } = useContext(GlobalContext)

	const { state: { postLoad }, postComment } = useContext(ThreadContext)

	const [value, setValue] = useState('')
	const [cancel, setCancel] = useState(false)

	const textRef = useRef()

	const expandText = e => {
		if (!validText(e.target.value)) {

			expandTextarea(e.target, 85)

			setValue(e.target.value)

			setCancel(true)

		} else {

			cancelPost()

		}
	}

	const cancelPost = () => {
		setValue('')
		setCancel(false)

		textRef.current.style.height = '85px'
	}

	const submitComment = () => {
		if (!validText(value)) {

			cancelPost()

			postComment(value, user._id)

		}
	}

	return (
		<div className="thread_form comment">

			<div className="comment_header">
				<div className="author_picture">
					<div
						className="background-ui"
						style={{ backgroundImage: `url(/images/users/${user.image.avatar})` }}
					>
					</div>
				</div>

				<div className="author_info text-ui">
					<div className="author_username">
						<div>
							{user.username}
						</div>
						{user.badge.title &&
							<Badge badge={user.badge} />
						}
						{user.admin &&
							<span className="userIsAdmin">(Admin)</span>
						}
					</div>

					{user.motto &&
						<div className="author_motto">{user.motto}</div>
					}

				</div>
			</div>

			<div className={`comment_content${postLoad ? ' disabled' : ''}`}>
				<textarea
					name="comment_content"
					value={value}
					placeholder="What's on your mind?"
					maxLength="9999"
					spellCheck="false"
					className="comment_text comment_textarea"
					onChange={expandText}
					ref={textRef}
				>
				</textarea>
			</div>

			<div className="comment_actions">
				<div className="action_hold">
					{cancel &&
						<button
							type="button"
							className="com_post_btn enspr_red_btn"
							onClick={cancelPost}
						>
							Cancel
						</button>
					}
					<button
						type="button"
						className={`com_post_btn enspr_red_btn${!cancel ? ' disabled' : ''}`}
						disabled={!cancel ? true : false}
						onClick={submitComment}
					>
						{postLoad
							? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
							: 'Comment'
						}
					</button>
				</div>
			</div>

		</div>
	)
}