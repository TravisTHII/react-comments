import React, { useContext } from 'react'

import { GlobalContext } from '../../context/GlobalState'

import { SelectThreadItem } from '../thread/SelectThreadItem'

export function SelectThread() {

	const { state: { thread, threads } } = useContext(GlobalContext)

	return (
		<div className="select-thread">
			<div className="st-header">
				<p>Select thread</p>
			</div>
			<div className="st-threads">
				{threads.map(t => (
					<SelectThreadItem
						key={t._id}
						selected={thread === t._id}
						thread={t}
					/>
				))}
			</div>
		</div>
	)
}
