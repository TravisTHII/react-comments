const User = require("../models/User")
const Thread = require("../models/Thread")
const Comment = require("../models/Comment")

const { format, formatDistance } = require('date-fns')

// @desc 		Get a thread
// @route 	GET /api/hmd/thread
// @access 	Public
exports.getThread = async (req, res) => {
	try {

		const { _thread_name } = req.params

		const thread = await Thread
			.findById({ _id: _thread_name }, ' -_id')
			.lean()
			.populate('user')
			.exec()
			.then(thread => {

				for (const i of thread.comments) {
					i.date = {
						published: formatDistance(i.date, Date.now(), { addSuffix: true }),
						posted: format(i.date, 'MMMM do, y | h:mm a')
					}
				}

				return thread

			})

		return res.status(200).json({
			data: {
				total: thread.comments.length
			},
			thread
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}

// @desc Post a comment
// @route POST /api/hmd/thread/comment
// @access Public
exports.Comment = async (req, res) => {
	try {

		const { thread, user, body } = req.body

		if (!user)
			throw new Error

		const poster = await User.findById({ _id: user })

		const newComment = new Comment({
			thread,
			body,
			user: poster
		})

		await newComment.save()

		const comment = await Comment
			.findById({ _id: newComment._id }, '-__v')
			.populate('user', '-__v')
			.lean()
			.exec()
			.then(comment => {

				comment.date = Date.now()

				return comment

			})

		await Thread.findByIdAndUpdate(
			{ _id: thread },
			{ $push: { "comments": comment } }
		)

		comment.date = {
			published: formatDistance(comment.date, Date.now(), { addSuffix: true }),
			posted: format(comment.date, 'MMMM do, y | h:mm a')
		}

		return res.status(200).json({
			comment
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}