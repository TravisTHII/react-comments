const { format, formatDistance } = require('date-fns')
const uniqueString = require('unique-string')

exports.generateComment = (comment, total = 0) => {

	return {
		...comment,
		reply: {
			...comment.reply,
			total,
			hasReplies: total ? true : false
		},
		date: {
			published: formatDistance(comment.date, Date.now(), { addSuffix: true }),
			posted: format(comment.date, 'MMMM do, y | h:mm a')
		},
		react: {
			key: uniqueString()
		}
	}

}