const User = require("../models/User")
const Thread = require("../models/Thread")
const Comment = require("../models/Comment")

const { generateComment } = require('../utils/generateComment')
const { createAccessToken } = require("../utils/createToken")
const { sendCookieToken } = require("../utils/sendCookieToken")

// @desc 		Get users & threads
// @route 	GET /api/v1/thread/selectors
// @access 	Public
exports.Selectors = async (req, res) => {
	try {

		const threads = await Thread.find().select('_id name')

		const users = await User.find().select('-__v')

		// automatically "sign in" as second user
		// same as front end
		// demonstration purposes only
		const token = createAccessToken(users[2])

		sendCookieToken(res, token)

		return res.status(200).json({
			threads,
			users,
			token
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

		const { _id } = req.token

		const { _thread_name } = req.params

		let { sort, cursor } = req.query

		const limit = 18

		const { pinned } = await Thread
			.findById({ _id: _thread_name })
			.lean()
			.populate({
				path: 'pinned',
				select: '-__v',
				populate: {
					path: 'user',
					select: '-__v'
				}
			})
			.then(async doc => {

				if (doc.pinned) {
					doc.pinned = await generateComment(doc.pinned, _id)
				}

				return doc

			})

		const { total, end, comments } = await Comment
			.paginate(
				{
					thread: _thread_name
				},
				{
					offset: cursor || 0,
					limit,
					lean: true,
					select: '-__v',
					sort: { date: (sort === 'oldest') ? 'asc' : 'desc' },
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
			.then(async doc => {

				const a = []

				for (let i of doc.comments) {

					delete i.id

					a.push(await generateComment(i, _id))

				}

				doc.comments = a

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
			pinned: pinned || null,
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

		const { _id } = req.token

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

		// get comment to return
		const comment = await Comment
			.findById({ _id: c._id }, '-__v')
			.lean()
			.populate('user', '-__v')
			.then(async comment => {

				return await generateComment(comment, _id)

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