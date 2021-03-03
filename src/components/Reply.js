import React, { useContext, useState } from 'react'

import { CommentContext } from '../context/CommentState'

import { validText, expandTextarea } from '../utils/functions'

import { Spinner } from './includes/Spinner'

export function Reply() {

	const { state: { replyLoad, isReplying }, postReply, openReply } = useContext(CommentContext)

	const [value, setValue] = useState('')

	let reply

	const expandText = e => {
		expandTextarea(e.target, 45)

		setValue(e.target.value)
	}

	const submitReply = () => {
		// if (!validText(value)) {
		// 	setValue('')

		// 	postReply(value, user.slug)
		// }
	}

	reply =
		<div className="comment_reply">
			<div className="reply_content">
				<div className='reply_user'>
					<div className='background-ui' style={{ backgroundImage: "url('/images/users/geralt.png')" }}></div>
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
					<button className="enspr_red_btn" type="button" onClick={() => openReply()}>Cancel</button>
					<button className="enspr_red_btn" type="button" onClick={submitReply}>
						{replyLoad
							? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
							: 'Reply'
						}
					</button>
				</div>
			</div>
		</div>

	return (
		<>
			{isReplying && reply}
		</>
	)
}