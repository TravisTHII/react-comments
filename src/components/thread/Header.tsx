import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import { useThreadContext } from '../../context'

import { useOutsideClick } from '../../hooks/useOutsideClick'

export function Header() {
  const { total, sortThread } = useThreadContext()

  const [open, setOpen] = useState(false)

  const clickRef = useOutsideClick(() => {
    if (open) {
      setOpen(false)
    }
  })

  const [styles, api] = useSpring(() => ({
    height: '0px',
    config: { friction: 9, clamp: true },
  }))

  // Update spring with new props
  api.start({ height: open ? '70px' : '0px' })

  return (
    <div className="header">
      <div>
        <p>{`${total} Comment${total > 1 ? 's' : ''}`}</p>
      </div>
      <div
        className="header_menu"
        ref={clickRef}
        onClick={() => setOpen(!open)}
      >
        <div className="menu_item">Sort</div>
        <animated.ul style={styles}>
          <li className="menu_item" onClick={() => sortThread('newest')}>
            Newest
          </li>
          <li className="menu_item" onClick={() => sortThread('oldest')}>
            Oldest
          </li>
        </animated.ul>
      </div>
    </div>
  )
}
