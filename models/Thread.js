const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	pinned: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	}
})

module.exports = mongoose.model('Thread', ThreadSchema)