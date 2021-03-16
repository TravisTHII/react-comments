const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	pinned: String,
	comments: [Object]
})

module.exports = mongoose.model('Thread', ThreadSchema)