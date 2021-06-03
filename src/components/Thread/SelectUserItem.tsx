import React from 'react'

import { useGlobalContext } from '../../context/Global'

import { SelectUserItemProps } from './types'

export function SelectUserItem({ user, image, selected, localUser, setLocalUser }: SelectUserItemProps) {

	const { userLoading, selectUser } = useGlobalContext()

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