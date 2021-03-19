const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	pinned: {
		type: String,
		default: ""
	}
})

module.exports = mongoose.model('Thread', ThreadSchema)