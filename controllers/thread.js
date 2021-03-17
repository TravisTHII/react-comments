const User = require("../models/User")
const Thread = require("../models/Thread")
const Comment = require("../models/Comment")

const { format, formatDistance } = require('date-fns')

// @desc 		Get all threads
// @route 	GET /api/hmd/thread/all
// @access 	Public
exports.getThreads = async (req, res) => {
	try {

		const threads = await Thread.find().select('_id name')

		const users = await User.find().select('-__v')

		return res.status(200).json({
			threads,
			users
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}
}

// @desc 		Create a thread
// @route 	GET /api/hmd/thread/create
// @access 	Public
exports.createThread = async (req, res) => {
	try {

		const { name } = req.body

		if (!name)
			throw new Error('Please enter a thread name.')

		const thread = new Thread({
			name
		})

		await thread.save()

		return res.status(200).json({
			message: `successfully created Thread ${name}!`
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}
}

// @desc 		Get a thread
// @route 	GET /api/hmd/thread
// @access 	Public
exports.getThread = async (req, res) => {
	try {

		const { _thread_name } = req.params

		const thread = await Thread
			.findById({ _id: _thread_name }, ' -_id -__v')
			.lean()
			.populate({
				path: 'comments',
				populate: {
					path: 'user',
					select: '-__v'
				},
				select: '-__v'
			})
			.exec()
			.then(doc => {

				for (const i of doc.comments) {

					i.reply.total = i.reply.replies.length
					i.reply.hasReplies = i.reply.total ? true : false

					i.date = {
						published: formatDistance(i.date, Date.now(), { addSuffix: true }),
						posted: format(i.date, 'MMMM do, y | h:mm a')
					}

				}

				return doc

			})

		const total = thread.comments.length

		return res.status(200).json({
			data: {
				total,
				hasComments: (total > 0) ? true : false
			},
			...thread
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

		// if no user throw error
		if (!user)
			throw new Error

		// get user
		const u = await User.findById({ _id: user })

		// create comment
		const c = new Comment({
			thread,
			body,
			user: u,
			date: Date.now()
		})

		// save comment to comments document
		await c.save()

		// push comment_id_ref to thread comments array
		await Thread.findByIdAndUpdate(
			{ _id: thread },
			{ $push: { "comments": c } }
		)

		// get comment to return
		const comment = await Comment
			.findById({ _id: c._id }, '-__v')
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
			comment
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}