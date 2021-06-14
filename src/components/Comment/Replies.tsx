import React from 'react'

import { useCommentContext } from '../../context/Comment'

import { Comment } from '../Comment'

import { Spinner } from '../Includes/Spinner'

export function Replies() {

  const {
    paging,
    results,
    loading,
    fetched,
    localReplies,
    showReplies,
    replyLoad,
    moreLoading,
    moreReplies
  } = useCommentContext()

  let content

  const Loading =
    <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto' }} />

  if (loading) {

    content = Loading

  } else if (fetched || localReplies) {

    content =
      results.map(c => (
        <Comment
          key={`${c.react.key}`}
          comment={c}
        />
      ))

  }

  return (
    <div className={`comment_replies${showReplies ? ' view_replies' : ''}`}>
      <div className="replies">
        {replyLoad && Loading}
        {content}
      </div>
      {(!paging.end && fetched) &&
        <div className="load_replies">
          {moreLoading
            ? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '35px', height: '35px' }} />
            : <button className="cmt_btn" type="button" onClick={() => moreReplies()}>see more comments</button>
          }
        </div>
      }
    </div>
  )
}