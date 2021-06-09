import React, { useEffect, useState } from 'react'

import { useThreadContext } from '../../context/Thread'
import { useCommentContext } from '../../context/Comment'

import { useOutsideClick } from '../../hooks/useOutsideClick'

import { offset } from '../../utils'

import { MenuProps } from './types'

export function Menu({ deleteRef }: MenuProps) {

  const {
    thread,
    menu: {
      commentRef,
      data
    },
    pinned: {
      pinned_id
    },
    destroyMenu,
    updatePinnedComment
  } = useThreadContext()

  const { comment, pinComment, startEditing, deleteComment } = useCommentContext()

  const [updatedMenu, setUpdatedMenu] = useState(data)

  const menuRef = useOutsideClick((e) => {
    if (!(e.target as Element).closest('.comment_options')) {
      destroyMenu()
    }
  })

  useEffect(() => {

    const copy = [...updatedMenu]

    let index: number

    for (const i of copy) {
      if (/^(Pin|Unpin)$/.test(i)) index = copy.indexOf(i)
    }

    copy[index!] = (pinned_id === comment._id) ? 'Unpin' : 'Pin'

    setUpdatedMenu(copy)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const m = menuRef.current

    if (commentRef) {
      const elemTop = offset(commentRef).top
        , elemLeft = offset(commentRef).left
        , elemWidth = parseInt(getComputedStyle(commentRef).width)

      m!.style.top = `${elemTop + 5}px`
      m!.style.left = `${elemLeft + elemWidth}px`
      m!.style.display = 'block'
    }

  }, [commentRef, menuRef])

  useEffect(() => {
    window.addEventListener('scroll', destroyMenu)

    return () => window.removeEventListener('scroll', destroyMenu)
  }, [destroyMenu])

  const menuAction = async (m: string) => {
    switch (m) {
      case 'Pin': case 'Unpin':
        await pinComment(thread)
        updatePinnedComment(comment._id, m)
        break;
      case 'Edit': startEditing(); break;
      case 'Delete': deleteComment(deleteRef.current); break;
      case 'Report':
        alert('Comment reported.\n\nNOTE: Demonstration purposes only, reporting is not fully implemented.');
        break;
      default: break;
    }
  }

  return (
    <span
      id="menu_render"
      className="comment_menu"
      ref={menuRef}
    >
      <div className="opt_menu_container">
        {updatedMenu.map((m, i) => (
          <div
            key={i}
            className="opt_menu_item"
            onClick={() => menuAction(m)}
          >
            {m}
          </div>
        ))}
      </div>
    </span>
  )
}