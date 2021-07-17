import React from 'react'

import { useGlobalContext } from '../../../context/Global'

import { Props } from './types'

export function Item({
  user,
  image,
  selected,
  localUser,
  setLocalUser
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
    <div
      className={`user-select${selected ? ' user-is-selected' : ''}`}
      onClick={() => setUser()}
    >
      <div
        className="background-ui"
        style={{ backgroundImage: `url(/images/users/${image})` }}
        title={user.username}
      >
      </div>
    </div>
  )
}