import React from 'react'

import { useCommentContext } from '../../context/comment'

export function Content() {
  const {
    showMore,
    comment: { body, data },
    seeMore,
  } = useCommentContext()

  return (
    <div
      className={`comment_content${
        data.overflow && !showMore ? ' show_less' : ''
      }`}
    >
      <div className="comment-text text-ui">{body}</div>

      {data.overflow && (
        <div
          className="cmt_grade gradient-bottom-ui"
          style={{ position: showMore ? 'relative' : undefined }}
        >
          <button
            type="button"
            className="enspr_red_btn"
            onClick={() => seeMore()}
          >
            {showMore ? 'show less' : 'show more'}
          </button>
        </div>
      )}
    </div>
  )
}
