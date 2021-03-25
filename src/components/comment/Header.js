import React, { useContext, useEffect, useState } from 'react'

import Dots from '@material-ui/icons/MoreVert'
import { TiPin } from 'react-icons/ti'
import { FaUserShield } from 'react-icons/fa'

import { ThreadContext } from '../../context/ThreadState'
import { CommentContext } from '../../context/CommentState'

import { Badge } from '../includes/Badge'
import { Spinner } from '../includes/Spinner'

export function Header({ refrence }) {

	const { state: { pinned: { pinned_id }, menu: { commentRef } }, getMenu } = useContext(ThreadContext)

	const { state: { pinLoad }, comment: { _id, user, date, data, menu } } = useContext(CommentContext)

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
			getMenu(refrence.current, menu)
		}
	}

	return (
		<div className="comment_header">

			<div className="comment_author">

				<div className="author_picture">
					<div className="background-ui" style={{ backgroundImage: `url(/images/users/${user.image.avatar})` }}></div>
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
					<span className="userIsAdmin" title="Administrator">
						<FaUserShield />
					</span>
				}

				{pinLoad
					? <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '25px', height: '25px' }} />
					: (pinned_id === _id) &&
					<span className="opt_ui cmt_pin flex-ui">
						<TiPin />
					</span>
				}

				<button
					type="button"
					className={`cp_opt_icn opt_ui${active ? ' cp_opt_on' : ''}`}
					onClick={activateMenu}
				>
					<Dots />
				</button>

			</div>

		</div>
	)
}