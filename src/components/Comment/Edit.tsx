import React, { useEffect, useRef, useState } from 'react'

import { useCommentContext } from 'context/Comment'

import { expandTextarea, validText } from 'utils'

import { Spinner } from '../Includes/Spinner'

export function Edit() {

	const { editLoad, comment: { body }, startEditing, editComment } = useCommentContext()

	const [value, setValue] = useState(body)

	const textRef = useRef<HTMLTextAreaElement>(null!)

	useEffect(() => {
		expandTextarea(textRef.current, 45)
	}, [])

	const expandText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		expandTextarea(e.target, 45)

		setValue(e.target.value)
	}

	const submitEdit = () => {
		if (!validText(value)) {
			editComment(value)
		}
	}

	return (
		<div className="comment_edit">
			<div className="edit_content">
				<textarea
					name="edit_content"
					value={value}
					placeholder="Edit away"
					maxLength={9999}
					spellCheck="false"
					className={`edit_text comment_textarea${editLoad ? ' disabled' : ''}`}
					onChange={expandText}
					disabled={editLoad ? true : false}
					ref={textRef}
				>
				</textarea>
			</div>
			<div className="edit_actions">
				<div className='cac'>
					<button
						className={`enspr_red_btn${editLoad ? ' disabled' : ''}`}
						type='button'
						value='cancel'
						disabled={editLoad ? true : false}
						onClick={() => startEditing()}
					>
						Cancel
					</button>
					<button
						className={`enspr_red_btn${(body === value) ? ' disabled' : ''}`}
						type='button'
						value='edit'
						disabled={(editLoad || (body === value)) ? true : false}
						onClick={() => submitEdit()}
					>
						{editLoad
							? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
							: 'Edit'
						}
					</button>
				</div>
			</div>
		</div>
	)
}