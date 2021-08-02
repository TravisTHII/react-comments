import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

import { useThreadContext } from '../../context/Thread'
import { useCommentContext } from '../../context/Comment'

import { useOutsideClick } from '../../hooks/useOutsideClick'

import { offset } from '../../utils'

import { MenuProps } from './types'

export function Menu({ deleteRef }: MenuProps) {
  const {
    thread,
    pinned: { pinned_id, loading },
    menu: { commentRef, data },
    destroyMenu,
    updatePinnedComment,
  } = useThreadContext()

  const { comment, pinComment, startEditing, deleteComment } =
    useCommentContext()

  const menuRef = useOutsideClick((e) => {
    if (!(e.target as Element).closest('.comment_options')) {
      destroyMenu()
    }
  })

  useEffect(() => {
    const m = menuRef.current

    if (commentRef) {
      const elemTop = offset(commentRef).top,
        elemLeft = offset(commentRef).left,
        elemWidth = parseInt(getComputedStyle(commentRef).width)

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
      case 'Pin':
      case 'Unpin':
        if (!loading) {
          await pinComment(thread)
          updatePinnedComment(comment._id, m)
        }
        break
      case 'Edit':
        startEditing()
        break
      case 'Delete':
        if (comment._id === pinned_id) {
          alert('Cannot delete comment while pinned. Unpin comment first.')
        } else {
          deleteComment(deleteRef.current)
        }
        break
      case 'Report':
        alert(
          'Comment reported.\n\nNOTE: Demonstration purposes only, reporting is not fully implemented.'
        )
        break
      default:
        break
    }
  }

  return ReactDOM.createPortal(
    <div id="menu_render" className="comment_menu" ref={menuRef}>
      <div className="opt_menu_container">
        {data.map((m, i) => (
          <div key={i} className="opt_menu_item" onClick={() => menuAction(m)}>
            {m}
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}
