import React from 'react'

import { useGlobalContext } from '../../context/Global'
import { CommentProvider } from '../../context/Comment'

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