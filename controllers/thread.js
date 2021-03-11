const User = require("../models/User")
const Thread = require("../models/Thread")
const Comment = require("../models/Comment")

const { format, formatDistance } = require('date-fns')

// @desc 		Get a thread
// @route 	GET /api/hmd/thread
// @access 	Public
exports.getThread = async (req, res) => {
	try {

		const { thread } = req.query

		const comments = await Comment
			.find({ thread })
			.sort({ date: 'descending' })
			.lean()
			.populate('user')
			.exec()
			.then(comment => {

				for (const i of comment) {
					i.date = {
						published: formatDistance(i.date, Date.now(), { addSuffix: true }),
						posted: format(i.date, 'MMMM do, y | h:mm a')
					}
				}

				return comment

			})

		return res.status(200).json({
			data: {
				total: comments.length
			},
			comments
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}

// @desc 		Get all thread names
// @route 	GET /api/hmd/thread/all
// @access 	Public
exports.getThreads = async (req, res) => {
	try {

		const threads = await Thread.find()

		return res.status(200).json({
			data: threads
		})

	} catch (error) {

		return res.status(500).json({
			error: 'Server Error'
		})

	}

}

// @desc Post a comment
// @route POST /api/hmd/thread/comment
// @access Public
exports.Comment = async (req, res) => {
	try {

		const { thread, _id, body } = req.body

		if (!_id)
			throw new Error

		const user = await User.findById({ _id })

		const newComment = new Comment({
			thread,
			body,
			user,
			date: Date.now()
		})

		await newComment.save()

		const comment = await Comment
			.findById({ _id: newComment._id })
			.populate('user')
			.lean()
			.exec()
			.then(comment => {

				comment.date = {
					published: formatDistance(comment.date, Date.now(), { addSuffix: true }),
					posted: format(comment.date, 'MMMM do, y | h:mm a')
				}

				return comment

			})

		return res.status(200).json({
			comment
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}