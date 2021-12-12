import React from 'react'

import { useGlobalContext } from '../../../context/global'

import { Props } from './types'

export function Thread({ thread: { _id, name }, selected }: Props) {
  const { selectThread } = useGlobalContext()

  return (
    <li
      className={`thread-selector flex_ui${
        selected ? ' thread-is-selected' : ''
      }`}
      onClick={() => selectThread(_id)}
    >
      {name}
    </li>
  )
}
