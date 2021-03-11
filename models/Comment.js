const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	thread: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Thread',
		required: true
	},
	body: String,
	date: {
		type: Date
	},
	reply: {
		hasReplies: {
			type: Boolean,
			default: false
		},
		total: {
			type: Number,
			default: 0
		},
		replies: Array
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	menu: Array,
	data: {
		edited: {
			type: Boolean,
			default: false
		},
		pinned: {
			type: Boolean,
			default: false
		},
		reported: {
			type: Boolean,
			default: false
		},
		overflow: {
			type: Boolean,
			default: false
		},
	}
})

module.exports = mongoose.model('Comment', CommentSchema)