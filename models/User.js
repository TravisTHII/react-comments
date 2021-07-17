const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  slug: String,
  motto: String,
  badge: {
    title: String,
    backgroundColor: String,
    textColor: String,
  },
  image: {
    avatar: String
  }
})

module.exports = mongoose.model('User', UserSchema)