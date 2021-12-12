import React from 'react'

import { useGlobalContext } from '../../../context/global'

import { Thread } from './Thread'

export function SelectThread() {
  const { thread, threads } = useGlobalContext()

  return (
    <div className="select-thread">
      <div className="st-header">
        <p>Select thread</p>
      </div>
      <ul className="st-threads">
        {threads.map((t) => (
          <Thread key={t._id} selected={thread === t._id} thread={t} />
        ))}
      </ul>
    </div>
  )
}
