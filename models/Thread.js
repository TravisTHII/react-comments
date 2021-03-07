const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
	name: {
		type: String
	}
})

module.exports = mongoose.model('Thread', ThreadSchema)