const User = require("../models/User")
const Comment = require("../models/Comment")

const { generateComment } = require('../utils/generateComment')

// @desc 		Post Reply
// @route 	POST /api/v1/comment/reply
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
			reply: {
				total: 0,
				hasReplies: false,
				to: c
			},
			user: u,
			date: Date.now()
		})

		// save reply
		await r.save()

		// get reply to return
		const reply = await Comment
			.findById({ _id: r._id }, '-__v')
			.lean()
			.populate('user', '-__v')
			.then(comment => {

				return generateComment(comment)

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
// @route 	POST /api/v1/comment/replies
// @access 	Public
exports.Replies = async (req, res) => {
	try {

		const { comment } = req.body

		let { cursor } = req.query

		const limit = 1

		const { end, replies } = await Comment
			.paginate(
				{
					"reply.to": comment
				},
				{
					offset: cursor || 0,
					limit,
					lean: true,
					select: '-__v',
					sort: { date: 'desc' },
					populate: {
						path: 'user',
						select: '-__v'
					},
					customLabels: {
						docs: 'replies',
						hasNextPage: 'end'
					}
				})
			.then(async doc => {

				const a = []

				for (const i of doc.replies) {

					delete i.id

					const total = await Comment.find({ "reply.to": i._id }).countDocuments()

					a.push(generateComment(i, total))

				}

				doc.replies = a

				return doc

			})

		cursor = parseInt(cursor) + limit || limit

		return res.status(200).json({
			paging: {
				end: !end,
				cursor
			},
			replies
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}