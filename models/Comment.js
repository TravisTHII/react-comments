const mongoose = require('mongoose')

const { format, formatDistance } = require('date-fns')

const CommentSchema = new mongoose.Schema({
	thread: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Thread',
		required: true
	},
	content: String,
	date: {
		type: Date,
		default: Date.now()
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

// fire a function before doc saved to db
CommentSchema.pre('save', async function (next) {

	this.date = {
		published: formatDistance(new Date(this.date), Date.now(), { addSuffix: true }),
		posted: format(new Date(this.date), 'MMMM do, y | h:mm a')
	}

	next()

})

module.exports = mongoose.model('Comment', CommentSchema)