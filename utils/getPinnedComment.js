const Thread = require("../models/Thread")

const { generateComment } = require("./generateComment")

exports.getPinnedComment = async (thread, id) => {

  const { pinned } = await Thread
    .findById({ _id: thread })
    .lean()
    .populate({
      path: 'pinned',
      select: '-__v',
      populate: {
        path: 'user',
        select: '-__v'
      }
    })
    .then(async doc => {

      if (doc.pinned) {
        doc.pinned = await generateComment(doc.pinned, id)
      }

      return doc

    })

  return pinned

}