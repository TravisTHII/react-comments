import mongoose from 'mongoose'

const ThreadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pinned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
  },
})

export default mongoose.model('Thread', ThreadSchema)
