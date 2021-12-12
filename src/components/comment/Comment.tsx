import React, { useRef } from 'react'

import { useThreadContext } from '../../context/thread'
import { useCommentContext } from '../../context/comment'

import { Header, Content, Edit, Actions, Reply, Replies } from './'

import { Menu } from '../thread'

import { Spinner } from '../includes'

export function Comment() {
  const {
    menu: { display, commentRef: ref },
  } = useThreadContext()

  const { isEditing, deleteLoad } = useCommentContext()

  const commentRef = useRef<HTMLDivElement>(null)

  const comment = (
    <div className="comment" ref={commentRef}>
      <div className="comment_post">
        <Header refrence={commentRef} />
        {isEditing ? <Edit /> : <Content />}
        <Actions />
        <Reply />
      </div>
      <Replies />
    </div>
  )

  return (
    <>
      {display && ref === commentRef.current && <Menu deleteRef={commentRef} />}

      {deleteLoad ? (
        <div>
          <Spinner style={{ display: 'block', margin: '0 auto' }} />
        </div>
      ) : (
        comment
      )}
    </>
  )
}
