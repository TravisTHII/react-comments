import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

export function User({ user, image, selected }) {

	const { selectUser } = useContext(GlobalContext)

	return (
		<div
			className={`user-select ${selected ? 'user-is-selected' : ''}`}
			onClick={() => selectUser(user)}
		>
			<div
				className="background-ui"
				style={{ backgroundImage: `url(/images/users/${image})` }}
			>
			</div>
		</div>
	)
}