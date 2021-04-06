import React, { useContext } from 'react'

import { GlobalContext } from '../../context/GlobalState'

export function SelectUserItem({ user, image, selected, localUser, setLocalUser }) {

	const { state: { userLoading }, selectUser } = useContext(GlobalContext)

	const setUser = () => {
		if (!userLoading) {
			selectUser(user)

			if (localUser === user)
				return setLocalUser({})

			setLocalUser(user)
		}
	}

	return (
		<div
			className={`user-select ${selected ? 'user-is-selected' : ''}`}
			onClick={() => setUser()}
		>
			<div
				className="background-ui"
				style={{ backgroundImage: `url(/images/users/${image})` }}
			>
			</div>
		</div>
	)
}