import React, { useContext } from 'react'

import { GlobalContext } from '../context/GlobalState'

export function SelectThreadItem({ thread: { _id, name }, selected }) {

	const { selectThread } = useContext(GlobalContext)

	return (
		<div
			className={`thread-selector flex-ui ${selected ? 'thread-is-selected' : ''}`}
			onClick={() => selectThread(_id)}
		>
			{name}
		</div>
	)
}
