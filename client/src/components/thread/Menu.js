import React, { useContext, useEffect } from 'react'

import { ThreadContext } from '../../context/ThreadState'

import useOutsideClick from '../../hooks/useOutsideClick'

import { offset } from '../../utils/functions'

export function Menu() {

	const { state: { menu: { commentRef, data } }, destroyMenu } = useContext(ThreadContext)

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
		m.style.left = `${elemLeft + elemWidth - 5}px`
	}, [commentRef, menuRef])

	useEffect(() => {
		window.addEventListener('scroll', destroyMenu)

		return () => window.removeEventListener('scroll', destroyMenu)
	}, [destroyMenu])

	return (
		<div
			id="menu_render"
			className="comment_menu"
			ref={menuRef}
		>
			<div className="opt_menu_container">
				{data.map((m, i) => (
					<div
						key={i}
						className="opt_menu_item"
						onClick={() => console.log(m)}
					>
						{m}
					</div>
				))}
			</div>
		</div>
	)
}