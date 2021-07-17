const mongoose = require('mongoose')

const ThreadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pinned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  }
})

module.exports = mongoose.model('Thread', ThreadSchema)