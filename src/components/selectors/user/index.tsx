import React, { useState } from 'react'

import { useGlobalContext } from '../../../context'

import { User } from './User'

export function SelectUser() {
  const { users } = useGlobalContext()

  const [localUser, setLocalUser] = useState({})

  return (
    <div className="select-user">
      <div className="su-header">
        <p>Select user</p>
      </div>
      <ul className="users">
        {users.map((u) => (
          <User
            key={u._id}
            user={u}
            image={u.image.avatar}
            selected={localUser === u}
            localUser={localUser}
            setLocalUser={setLocalUser}
          />
        ))}
      </ul>
    </div>
  )
}
