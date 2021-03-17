import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

import { User } from './User'

export function SelectUser() {

	const { state: { user, users } } = useContext(GlobalContext)

	return (
		<div className="select-user">
			<div className="su-header">
				<p>Select user</p>
			</div>
			<div className="users">
				{users.map(u => (
					<User
						key={u._id}
						user={u}
						image={u.image.avatar}
						selected={user === u}
					/>
				))}
			</div>
		</div>
	)
}
