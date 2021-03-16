const User = require("../models/User")
const Comment = require("../models/Comment")

const { format, formatDistance } = require('date-fns')
const { findById } = require("../models/User")

// @desc 		Post Reply
// @route 	POST /api/hmd/comment/reply
// @access 	Public
exports.Reply = async (req, res) => {
	try {

		const { _id, body, user } = req.body

		// const poster = await User.findById({ _id: user })

		// const test = await Comment.findById({ _id })

		const reply_to_comment = new Comment({
			body,
			date: Date.now()
		})

		await Comment.findOneAndUpdate(
			{ _id },
			{ "reply": { $push: { "replies": [reply_to_comment] } } },
		)

		// const comment = await Comment
		// 	.findById({ _id: reply_to_comment._id })
		// 	.populate('user')
		// 	.lean()
		// 	.exec()
		// 	.then(comment => {

		// 		// comment.date = {
		// 		// 	published: formatDistance(comment.date, Date.now(), { addSuffix: true }),
		// 		// 	posted: format(comment.date, 'MMMM do, y | h:mm a')
		// 		// }

		// 		// return comment

		// 		console.log(comment)

		// 	})

		return res.status(200).json({
			reply_to_comment
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}

// @desc 		Get Replies
// @route 	POST /api/hmd/comment/replies
// @access 	Public
exports.Replies = async (req, res) => {
	try {



	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}