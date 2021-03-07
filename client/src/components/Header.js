import React, { useContext, useState } from 'react'

import { ThreadContext } from '../context/ThreadState'

import useOutsideClick from '../hooks/useOutsideClick'

export function Header() {

	const { state: { total }, sortThread } = useContext(ThreadContext)

	const [open, setOpen] = useState(false)

	const clickRef = useOutsideClick(() => {
		setOpen(false)
	}, 'outside')

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