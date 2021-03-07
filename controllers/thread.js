const Thread = require("../models/Thread")

// @desc Get all thread
// @route GET /api/hmd/thread
// @access Public
exports.getThread = async (req, res) => {
	try {

		const threads = await Thread.find();

		return res.status(200).json({
			data: threads
		})

	} catch (error) {

		return res.status(500).json({
			error: 'Server Error'
		})

	}

}