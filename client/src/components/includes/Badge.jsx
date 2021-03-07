import React from 'react'

export function Badge({ badge }) {
	return (
		<span className="badge" style={{ backgroundColor: `${badge.background_color}`, color: `${badge.text_color}` }}>
			{badge.title}
		</span>
	)
}