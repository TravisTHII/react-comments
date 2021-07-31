import Thread from '../models/Thread'

import { generateComment } from './generateComment'

export const getPinnedComment = async (thread: string, id: string) => {
  const { pinned } = await Thread.findById({ _id: thread })
    .lean()
    .populate({
      path: 'pinned',
      select: '-__v',
      populate: {
        path: 'user',
        select: '-__v',
      },
    })
    .then(async (doc) => {
      if (doc.pinned) {
        doc.pinned = await generateComment(doc.pinned, id)
      }

      return doc
    })

  return pinned
}
