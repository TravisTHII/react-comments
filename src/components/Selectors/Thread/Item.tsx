import React from 'react'

import { useGlobalContext } from 'context/Global'

interface Props {
  thread: {
    _id: string
    name: string
  }
  selected: boolean
}

export function Item({
  thread: {
    _id,
    name
  },
  selected
}: Props) {

  const { selectThread } = useGlobalContext()

  return (
    <div
      className={`thread-selector flex_ui ${selected ? 'thread-is-selected' : ''}`}
      onClick={() => selectThread(_id)}
    >
      {name}
    </div>
  )
}