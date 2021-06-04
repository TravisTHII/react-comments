import React, { useEffect, useState } from 'react'

import { BiDotsVerticalRounded } from 'react-icons/bi'
import { TiPin } from 'react-icons/ti'
import { FaUserShield } from 'react-icons/fa'

import { useThreadContext } from 'context/Thread'
import { useCommentContext } from 'context/Comment'

import { Badge } from '../Includes/Badge'
import { Spinner } from '../Includes/Spinner'

import { HeaderProps } from './types'

export function Header({ refrence }: HeaderProps) {

  const { pinned: { pinned_id }, menu: { commentRef }, getMenu } = useThreadContext()

  const { pinLoad, comment: { _id, user, date, data, menu } } = useCommentContext()

  const [active, setActive] = useState(false)

  useEffect(() => {
    if (commentRef !== refrence.current) {
      setActive(false)
    }
  }, [commentRef, refrence])

  useEffect(() => {
    const y = () => setActive(false)

    window.addEventListener('scroll', y)

    return () => window.removeEventListener('scroll', y)
  }, [])

  const activateMenu = () => {
    if (menu) {
      setActive(!active)
      getMenu(refrence.current!, menu)
    }
  }

  return (
    <div className="comment_header">

      <div className="comment_author">

        <div className="author_picture">
          <div className="background-ui" style={{ backgroundImage: `url(${user.image.avatar})` }}></div>
        </div>

        <div className="author_info text-ui">
          <div className="author_username">
            <div>
              {user.username}
            </div>
            {user.badge.title &&
              <Badge badge={user.badge} />
            }
          </div>

          {user.motto &&
            <div className="author_motto ellipsis-ui">{user.motto}</div>
          }

          <div title={date.posted} className="author_date">
            {`${date.published} ${data.edited ? '(edited)' : ''}`}
          </div>
        </div>

      </div>

      <div className="comment_options">

        {user.admin &&
          <span className="adminBadge flex_ui" title="Administrator">
            <FaUserShield />
          </span>
        }

        {pinLoad
          ? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '25px', height: '25px' }} />
          : (pinned_id === _id) &&
          <span className="opt_ui cmt_pin flex_ui">
            <TiPin />
          </span>
        }

        <button
          type="button"
          className={`cp_opt_icn opt_ui${active ? ' cp_opt_on' : ''}`}
          onClick={activateMenu}
        >
          <BiDotsVerticalRounded />
        </button>

      </div>

    </div>
  )
}