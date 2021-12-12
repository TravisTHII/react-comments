import React from 'react'

import { useGlobalContext } from '../../../context'

import { Props } from './types'

export function User({
  user,
  image,
  selected,
  localUser,
  setLocalUser,
}: Props) {
  const { userLoading, selectUser } = useGlobalContext()

  const setUser = () => {
    if (!userLoading) {
      selectUser(user)

      if (localUser === user) return setLocalUser({})

      setLocalUser(user)
    }
  }

  return (
    <li
      className={`user-select${selected ? ' user-is-selected' : ''}`}
      onClick={() => setUser()}
    >
      <div
        className="background-ui"
        style={{ backgroundImage: `url(/images/users/${image})` }}
        title={user.username}
      ></div>
    </li>
  )
}
