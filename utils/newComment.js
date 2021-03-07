import { format, formatDistance } from 'date-fns'

import { isOverflowed } from './functions'

export function newComment(user, content, date) {
	return {
		content,
		data: {
			edited: false,
			overflow: isOverflowed(content),
			false: false,
			pinned: false
		},
		date: {
			published: formatDistance(date, Date.now(), { addSuffix: true }),
			posted: format(date, 'MMMM do, y | h:mm a'),
			timestamp: Date.now()
		},
		reply: {
			has_replies: false,
			total: 0
		},
		menu: ["Pin", "Edit", "Delete", "Remove", "Report"],
		user
	}
}