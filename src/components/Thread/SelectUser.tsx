import React, { useState } from 'react'

import { useGlobalContext } from '../../context/Global'


import { SelectUserItem } from './SelectUserItem'

export function SelectUser() {

	const { users } = useGlobalContext()

	const [localUser, setLocalUser] = useState({})

	return (
		<div className="select-user">
			<div className="su-header">
				<p>Select user</p>
			</div>
			<div className="users">
				{users.map(u => (
					<SelectUserItem
						key={u._id}
						user={u}
						image={u.image.avatar}
						selected={localUser === u}
						localUser={localUser}
						setLocalUser={setLocalUser}
					/>
				))}
			</div>
		</div>
	)
}
