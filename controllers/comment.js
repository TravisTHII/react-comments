const User = require("../models/User")
const Comment = require("../models/Comment")

const { format, formatDistance } = require('date-fns')

// @desc 		Post Reply
// @route 	POST /api/hmd/comment/reply
// @access 	Public
exports.Reply = async (req, res) => {
	try {

		const { comment, body, user } = req.body

		// get user
		const u = await User.findById({ _id: user })

		// get comment to reply to
		const c = await Comment.findById({ _id: comment })

		// create reply
		const r = new Comment({
			body,
			user: u,
			date: Date.now()
		})

		// save reply
		await r.save()

		// save comment_ref_id to replies array of comment
		await Comment.findByIdAndUpdate(
			{ _id: comment },
			{ $push: { "reply.replies": r } },
		)

		// get reply to return
		const reply = await Comment
			.findById({ _id: r._id }, '-__v')
			.lean()
			.populate('user', '-__v')
			.exec()
			.then(comment => {

				comment.date = {
					published: formatDistance(comment.date, Date.now(), { addSuffix: true }),
					posted: format(comment.date, 'MMMM do, y | h:mm a')
				}

				return comment

			})

		return res.status(200).json({
			comment: reply
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

		const { comment } = req.body

		const { reply: { replies } } = await Comment
			.findById({ _id: comment }, '-_id reply.replies')
			.lean()
			.populate({
				path: 'reply.replies',
				populate: {
					path: 'user',
					select: '-__v'
				},
				select: '-__v'
			})
			.exec()
			.then(doc => {

				const { reply: { replies } } = doc

				for (const i of replies) {

					i.reply.total = i.reply.replies.length
					i.reply.hasReplies = i.reply.total ? true : false

					i.date = {
						published: formatDistance(i.date, Date.now(), { addSuffix: true }),
						posted: format(i.date, 'MMMM do, y | h:mm a')
					}

				}

				return doc

			})

		return res.status(200).json({
			paging: {
				end: true
			},
			replies
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}