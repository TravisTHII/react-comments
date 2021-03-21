const { format, formatDistance } = require('date-fns')
const uniqueString = require('unique-string')

const User = require('../models/User')
const Thread = require('../models/Thread')
const Comment = require('../models/Comment')

exports.generateComment = async (comment, _id) => {

	const total = await Comment.find({ "reply.to": comment._id }).countDocuments()

	const pinned = await Thread.findOne().where('pinned').equals(comment._id)

	const { data: { edited } } = await Comment.findById({ _id: comment._id }).select('data.edited')

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
		menu: await generateMenu(comment, _id, pinned),
		data: {
			pinned: pinned ? true : false,
			edited,
			overflow: isOverflowed(comment.body)
		},
		react: {
			key: uniqueString()
		}
	}

}

const isOverflowed = (content) => {

	let s = content.split(/\r\n|\r|\n/m)

	return (s.length > 9 || content.length > 999) ? true : false

}

const generateMenu = async (comment, _id, pinned) => {

	const isPinned = pinned ? 'Unpin' : 'Pin'

	let menu

	const myComment = String(comment.user._id) === _id

	if (comment.user.admin) {

		if (myComment) {

			menu = [isPinned, 'Edit', 'Delete', 'Report']

		} else {

			menu = [isPinned, 'Delete', 'Report']

		}

	} else {

		if (myComment) {

			menu = ['Edit', 'Delete']

		} else {

			menu = ['Report']

		}

	}

	return menu

}