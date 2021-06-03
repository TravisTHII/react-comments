import React from 'react'

interface Props {
	badge: {
		title: string
		textColor: string
		backgroundColor: string
	}
}

export const Badge = ({ badge }: Props) =>
	<span
		className="badge"
		style={{ backgroundColor: `${badge.backgroundColor}`, color: `${badge.textColor}` }}
	>
		{badge.title}
	</span>