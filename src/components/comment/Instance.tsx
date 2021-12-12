import React from 'react'

import { useGlobalContext } from '../../context/global'
import { CommentProvider } from '../../context/comment'

import { Comment } from './Comment'

import { InstanceProps } from './types'

export function Instance({ comment }: InstanceProps) {
  const { token } = useGlobalContext()

  return (
    <CommentProvider comment={comment} token={token}>
      <Comment />
    </CommentProvider>
  )
}
