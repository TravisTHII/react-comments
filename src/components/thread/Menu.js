import React, { useContext, useEffect, useState } from 'react'

import { ThreadContext } from '../../context/ThreadState'
import { CommentContext } from '../../context/CommentState'

import useOutsideClick from '../../hooks/useOutsideClick'

import { offset } from '../../utils/functions'

export function Menu({ deleteRef }) {

	const {
		thread,
		state: {
			menu: {
				commentRef,
				data
			},
			pinned: {
				pinned_id
			}
		},
		destroyMenu,
		updatePinnedComment
	} = useContext(ThreadContext)

	const { comment, pinComment, startEditing, deleteComment } = useContext(CommentContext)

	const [updatedMenu, setUpdatedMenu] = useState(data)

	const menuRef = useOutsideClick((e) => {
		if (!e.target.closest('.comment_options')) {
			destroyMenu()
		}
	}, 'custom')

	useEffect(() => {

		const copy = [...updatedMenu]

		let index

		for (const i of copy)
			if (/^(Pin|Unpin)$/.test(i)) index = copy.indexOf(i)

		copy[index] = (pinned_id === comment._id) ? 'Unpin' : 'Pin'

		setUpdatedMenu(copy)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const m = menuRef.current
			, elemTop = offset(commentRef).top
			, elemLeft = offset(commentRef).left
			, elemWidth = parseInt(getComputedStyle(commentRef).width)

		m.style.top = `${elemTop + 5}px`
		m.style.left = `${elemLeft + elemWidth}px`
	}, [commentRef, menuRef])

	useEffect(() => {
		window.addEventListener('scroll', destroyMenu)

		return () => window.removeEventListener('scroll', destroyMenu)
	}, [destroyMenu])

	const menuAction = async (m) => {
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