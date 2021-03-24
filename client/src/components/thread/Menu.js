import React, { useContext, useEffect } from 'react'

import { ThreadContext } from '../../context/ThreadState'
import { CommentContext } from '../../context/CommentState'

import useOutsideClick from '../../hooks/useOutsideClick'

import { offset } from '../../utils/functions'

export function Menu({ deleteRef }) {

	const { thread, state: { menu: { commentRef, data } }, destroyMenu, updatePinnedComment } = useContext(ThreadContext)

	const { comment, pinComment, startEditing, deleteComment } = useContext(CommentContext)

	const menuRef = useOutsideClick((e) => {
		if (!e.target.closest('.comment_options')) {
			destroyMenu()
		}
	}, 'custom')

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
				data[data.indexOf(m)] = (m === 'Pin') ? 'Unpin' : 'Pin'

				break;
			case 'Edit': startEditing(); break;
			case 'Delete': deleteComment(deleteRef.current); break;
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
				{data.map((m, i) => (
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