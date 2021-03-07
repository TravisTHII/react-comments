import React, { useContext, useEffect, useState } from 'react'

// import { ThreadContext } from '../../../context/thread/ThreadState'
import { CommentContext } from '../../context/CommentState'

import useOutsideClick from '../../hooks/useOutsideClick'

import { Badge } from '../includes/Badge'

import Dots from '@material-ui/icons/MoreVert'
import PinSVG from '../../svg/pin.svg'

export function Header({ refrence }) {

	// const { getMenu } = useContext(ThreadContext)

	const { comment: { user, date, data, menu } } = useContext(CommentContext)

	const [active, setActive] = useState(false)

	const optiontRef = useOutsideClick(() => {
		setActive(false)
	}, 'outside')

	// useEffect(() => {
	// 	const y = () => {
	// 		setActive(false)
	// 	}

	// 	const s = document.querySelector('#profile_content')

	// 	s.addEventListener('scroll', y)

	// 	return () => s.removeEventListener('scroll', y)
	// }, [])

	const activateMenu = () => {
		setActive(!active)
		// getMenu(refrence.current, menu)
	}

	return (
		<div className="comment_header">

			<div className="comment_author">

				<div className="author_picture">
					<div className="background-ui" style={{ backgroundImage: `url(/images/users/${user.image.avatar})` }}></div>
				</div>

				<div className="author_info text-ui">
					<div className="author_username">
						<div>{user.username}</div>
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

				{data.pinned &&
					<span className="opt_ui cmt_pin"><PinSVG /></span>
				}

				<button
					type="button"
					className={`cp_opt_icn opt_ui${active ? ' cp_opt_on' : ''}`}
					onClick={activateMenu}
					ref={optiontRef}
				>
					<Dots />
				</button>

			</div>

		</div>
	)
}