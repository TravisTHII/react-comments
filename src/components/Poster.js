import React from 'react'

export function Poster() {
	return (
		<div className="thread_form comment">

			<div className="comment_header">
				<div className="author_picture">
					<div
						className="background-ui"
						style={{ backgroundImage: "url('/images/users/geralt.png')" }}
					>
					</div>
				</div>

				<div className="author_info text-ui">
					<div className="author_username">
						<div>Geralt</div>
					</div>
					<div className="author_motto"></div>
				</div>
			</div>

			<div className="comment_content">
				<textarea
					name="comment_content"
					placeholder="What's on your mind?"
					maxLength="9999"
					spellCheck="false"
					className="comment_text comment_textarea"
				>
				</textarea>
			</div>

			<div className="comment_actions">
				<div className="action_hold">
					<button
						type="button"
						className="com_post_btn enspr_red_btn disabled"
						disabled
					>
						Comment
					</button>
				</div>
			</div>

		</div>
	)
}