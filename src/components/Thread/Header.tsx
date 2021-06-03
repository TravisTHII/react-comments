import React, { useState } from 'react'

import { useThreadContext } from 'context/Thread'

import { useOutsideClick } from 'hooks/useOutsideClick'

export function Header() {

  const { total, sortThread } = useThreadContext()

  const [open, setOpen] = useState(false)

  const clickRef = useOutsideClick(() => {
    if (open) {
      setOpen(false)
    }
  })

  return (
    <div className="header">
      <div>
        <p>{`${total} Comment${total > 1 ? 's' : ''}`}</p>
      </div>
      <div
        className="header-menu"
        ref={clickRef}
        onClick={() => setOpen(!open)}
      >
        <div className="menu-item">Sort</div>
        <ul className={open ? 'menu-open' : ''}>
          <li
            className="menu-item"
            onClick={() => sortThread('newest')}
          >
            Newest
					</li>
          <li
            className="menu-item"
            onClick={() => sortThread('oldest')}
          >
            Oldest
					</li>
        </ul>
      </div>
    </div>
  )
}