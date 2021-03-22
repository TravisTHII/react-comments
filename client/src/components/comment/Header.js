import React, { useContext, useEffect, useState } from 'react'

import { ThreadContext } from '../../context/ThreadState'
import { CommentContext } from '../../context/CommentState'

import { Badge } from '../includes/Badge'

import Dots from '@material-ui/icons/MoreVert'
import { TiPin } from 'react-icons/ti'

import { Spinner } from '../includes/Spinner'

export function Header({ refrence }) {

	const { state: { menu: { commentRef } }, getMenu } = useContext(ThreadContext)

	const { state: { pinLoad }, comment: { user, date, data, menu } } = useContext(CommentContext)

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

					<div className="autho_motto_info">
						{user.motto &&
							<div className="author_motto ellipsis-ui">{user.motto}</div>
						}

						{user.admin &&
							<span className="userIsAdmin">(Admin)</span>
						}
					</div>

					<div title={date.posted} className="author_date">
						{`${date.published} ${data.edited ? '(edited)' : ''}`}
					</div>
				</div>

			</div>

			<div className="comment_options">

				{pinLoad &&
					<Spinner
						stroke="#fff"
						style={{ display: 'block', margin: '0 auto', width: '25px', height: '25px' }}
					/>
				}

				{data.pinned &&
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