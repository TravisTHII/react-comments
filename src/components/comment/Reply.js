import React, { useContext, useState, useEffect } from 'react'

import { GlobalContext } from '../../context/GlobalState'
import { CommentContext } from '../../context/CommentState'

import { validText, expandTextarea } from '../../utils/functions'

import { Spinner } from '../includes/Spinner'

export function Reply() {

	const { state: { user, loggedIn } } = useContext(GlobalContext)

	const { state: { replyLoad, isReplying }, postReply, openReply } = useContext(CommentContext)

	const [value, setValue] = useState('')
	const [active, setActive] = useState(false)

	let content

	useEffect(() => {
		return () => {
			setValue('')
			setActive(false)
		}
	}, [isReplying])

	const expandText = e => {
		setValue(e.target.value)

		if (!validText(e.target.value)) {
			expandTextarea(e.target, 45)
			setActive(true)
		} else {
			setActive(false)
		}
	}

	const submitReply = () => {
		if (!validText(value)) {
			setValue('')

			postReply(value, user._id)
		}
	}

	if (!loggedIn) {

		content =
			<div className='sitc'>
				<h3 className='text-ui fwn'>Please select a user to <span className="highlight-red">reply.</span></h3>
			</div>

	} else {

		content =
			<>
				<div className="reply_content">
					<div className='reply_user'>
						<div
							className='background-ui'
							style={{ backgroundImage: `url(/images/users/${user.image.avatar})` }}
						>
						</div>
					</div>
					<div className={`reply_txt${replyLoad ? ' disabled' : ''}`}>
						<textarea
							value={value}
							className="reply_textarea comment_textarea"
							name="reply_content"
							placeholder="What's on your mind?"
							maxLength="9999"
							spellCheck="false"
							onChange={expandText}
						>
						</textarea>
					</div>
				</div>
				<div className={`comment_actions${replyLoad ? ' disabled' : ''}`}>
					<div className="cac">
						<button
							className="enspr_red_btn"
							type="button"
							onClick={() => openReply()}
						>
							Cancel
						</button>
						<button
							className={`enspr_red_btn${!active ? ' disabled' : ''}`}
							type="button"
							disabled={!active ? true : false}
							onClick={submitReply}
						>
							{replyLoad
								? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
								: 'Reply'
							}
						</button>
					</div>
				</div>
			</>

	}

	return (
		<div className="comment_reply">
			{isReplying && content}
		</div>
	)
}