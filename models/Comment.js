const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const CommentSchema = new mongoose.Schema({
	thread: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Thread'
	},
	body: String,
	date: Date,
	reply: {
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	menu: [Array],
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

CommentSchema.plugin(paginate)

module.exports = mongoose.model('Comment', CommentSchema)