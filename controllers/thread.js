const uniqueString = require('unique-string')

const User = require("../models/User")
const Thread = require("../models/Thread")
const Comment = require("../models/Comment")

const { format, formatDistance } = require('date-fns')

// @desc 		Get users & threads
// @route 	GET /api/v1/thread/selectors
// @access 	Public
exports.Selectors = async (req, res) => {
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
// @route 	GET /api/v1/thread/create
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
// @route 	GET /api/v1/thread
// @access 	Public
exports.getThread = async (req, res) => {
	try {

		const { _thread_name } = req.params

		let { sort, cursor } = req.query

		const limit = 2

		const { pinned } = await Thread.findById({ _id: _thread_name }).select('pinned')

		const { total, end, comments } = await Comment
			.paginate({ thread: _thread_name },
				{
					offset: cursor || 0,
					limit,
					lean: true,
					select: '-__v',
					sort: { date: (sort === 'oldest') ? 'desc' : 'asc' },
					populate: {
						path: 'user',
						select: '-__v'
					},
					customLabels: {
						totalDocs: 'total',
						docs: 'comments',
						hasNextPage: 'end'
					}
				})
			.then(doc => {

				for (const i of doc.comments) {

					delete i.id

					i.reply.total = i.reply.replies.length
					i.reply.hasReplies = i.reply.total ? true : false

					i.date = {
						published: formatDistance(i.date, Date.now(), { addSuffix: true }),
						posted: format(i.date, 'MMMM do, y | h:mm a')
					}

					i.react = {
						key: uniqueString()
					}

				}

				return doc

			})

		cursor = parseInt(cursor) + limit || limit

		return res.status(200).json({
			data: {
				total,
				hasPinned: pinned ? true : false
			},
			paging: {
				end: !end,
				cursor
			},
			pinned,
			comments
		})

	} catch (error) {

		return res.status(500).json({
			error: error.message
		})

	}

}

// @desc Post a comment
// @route POST /api/v1/thread/comment
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

				comment.react = {
					key: uniqueString()
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