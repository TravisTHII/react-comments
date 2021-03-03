import { format, formatDistance } from 'date-fns'

import { random_str, isOverflowed } from './functions'

export function newComment(user, content, date) {
	return {
		comment_id: random_str(20),
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
		},
		reply: {
			has_replies: false,
			total: 0
		},
		menu: ["Pin", "Edit", "Delete", "Remove", "Report"],
		user
	}
}