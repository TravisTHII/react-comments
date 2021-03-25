import React from 'react'

export function Badge({ badge }) {
	return (
		<span className="badge" style={{ backgroundColor: `${badge.backgroundColor}`, color: `${badge.textColor}` }}>
			{badge.title}
		</span>
	)
}