import React, { useContext } from 'react'

import { CommentContext } from '../../context/CommentState'

export function Content() {

	const { state: { showMore }, comment: { body, data }, seeMore } = useContext(CommentContext)

	return (
		<div className={`comment_content${data.overflow && !showMore ? ' show_less' : ''}`}>
			<div className="comment-text text-ui">
				{body}
			</div>

			{data.overflow &&
				<div className="cmt_grade gradient-bottom-ui" style={{ position: showMore ? 'relative' : '' }}>
					<button
						type="button"
						className="enspr_red_btn"
						onClick={() => seeMore()}
					>
						{showMore ? 'show less' : 'show more'}
					</button>
				</div>
			}
		</div>
	)
}