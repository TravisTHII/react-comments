import React from 'react'

import { useGlobalContext } from 'context/Global'

import { SelectThreadItemProps } from './types'

export function SelectThreadItem({ thread: { _id, name }, selected }: SelectThreadItemProps) {

	const { selectThread } = useGlobalContext()

	return (
		<div
			className={`thread-selector flex_ui ${selected ? 'thread-is-selected' : ''}`}
			onClick={() => selectThread(_id)}
		>
			{name}
		</div>
	)
}
