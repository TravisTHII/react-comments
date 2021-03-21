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
	data: {
		pinned: {
			type: Boolean,
			default: false
		},
		edited: {
			type: Boolean,
			default: false
		},
	}
})

CommentSchema.plugin(paginate)

module.exports = mongoose.model('Comment', CommentSchema)