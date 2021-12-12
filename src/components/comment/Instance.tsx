import React from 'react'

import { useGlobalContext, CommentProvider } from '../../context'

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
