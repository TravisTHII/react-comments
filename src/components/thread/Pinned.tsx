import React, { useEffect } from 'react'

import { useThreadContext } from '../../context/thread'

import { Comment } from '../comment'

import { Spinner } from '../includes/spinner'

export function Pinned() {
  const {
    pinned: {
      pinned_id,
      hasPinned,
      useInitialPinned,
      useLocalPinned,
      loading,
      comment,
    },
    getPinnedComment,
  } = useThreadContext()

  let content

  useEffect(() => {
    if (useLocalPinned) getPinnedComment()
  }, [pinned_id, useLocalPinned, getPinnedComment])

  if (loading) {
    content = (
      <div>
        <Spinner style={{ display: 'block', margin: '0 auto' }} />
      </div>
    )
  } else if (comment) {
    content = <Comment comment={comment} />
  }

  return (
    <>
      {useInitialPinned ? <Comment comment={comment!} /> : hasPinned && content}
    </>
  )
}
