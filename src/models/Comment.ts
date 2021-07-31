import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const CommentSchema = new mongoose.Schema({
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
  },
  body: String,
  date: Date,
  reply: {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  data: {
    edited: {
      type: Boolean,
      default: false,
    },
  },
})

CommentSchema.plugin(paginate)

export const Comment = mongoose.model('Comment', CommentSchema)
