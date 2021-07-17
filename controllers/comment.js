const User = require("../models/User")
const Thread = require("../models/Thread")
const Comment = require("../models/Comment")

const { generateComment } = require('../utils/generateComment')

// @desc 		Post Reply
// @route 	POST /api/v1/comment/reply
// @access 	Public
exports.Reply = async (req, res) => {
  try {

    const { _id } = req.token

    const { comment, body, user } = req.body

    // get user
    const u = await User.findById({ _id: user })

    // get comment to reply to
    const c = await Comment.findById({ _id: comment })

    // if comment exist and has not been deleted
    if (c) {

      // create reply
      const r = new Comment({
        body,
        reply: {
          total: 0,
          hasReplies: false,
          to: c
        },
        user: u,
        date: Date.now()
      })

      // save reply
      await r.save()

      // get reply to return
      const reply = await Comment
        .findById({ _id: r._id }, '-__v')
        .lean()
        .populate('user', '-__v')
        .then(async comment => {

          return await generateComment(comment, _id)

        })

      return res.status(200).json({
        comment: reply
      })

    } else {

      return res.status(500).json({
        error: 'Comment does not exist'
      })

    }

  } catch (error) {

    return res.status(500).json({
      error: error.message
    })

  }

}

// @desc 		Get Replies
// @route 	POST /api/v1/comment/replies
// @access 	Public
exports.Replies = async (req, res) => {
  try {

    const { _id } = req.token

    const { comment } = req.body

    let { cursor } = req.query

    const limit = 9

    const { end, replies } = await Comment
      .paginate(
        {
          "reply.to": comment
        },
        {
          offset: cursor || 0,
          limit,
          lean: true,
          select: '-__v',
          sort: { date: 'desc' },
          populate: {
            path: 'user',
            select: '-__v'
          },
          customLabels: {
            docs: 'replies',
            hasNextPage: 'end'
          }
        })
      .then(async doc => {

        const a = []

        for (const i of doc.replies) {

          delete i.id

          a.push(await generateComment(i, _id))

        }

        doc.replies = a

        return doc

      })

    cursor = parseInt(cursor) + limit || limit

    return res.status(200).json({
      paging: {
        end: !end,
        cursor
      },
      replies
    })

  } catch (error) {

    return res.status(500).json({
      error: error.message
    })

  }

}

// @desc 		Pin a comment
// @route 	POST /api/v1/comment/pin
// @access 	Public
exports.Pin = async (req, res) => {
  try {

    const { thread, comment } = req.body

    const { pinned } = await Thread.findOne({ _id: thread }).select('pinned')

    const exist = await Comment.findById({ _id: comment })

    await Thread.findByIdAndUpdate(
      { _id: thread },
      { pinned: (String(pinned) === comment) ? null : comment }
    )

    let message

    if (!exist) {
      message = 'Error pinning comment.'
    } else {
      message = `Comment successfully ${pinned ? 'Unpinned' : 'Pinned'}.`
    }

    return res.status(200).json({
      message,
      exist: Boolean(exist)
    })

  } catch (error) {

    return res.status(500).json({
      error: error.message
    })

  }
}

// @desc 		Edit a comment
// @route 	POST /api/v1/comment/edit
// @access 	Public
exports.Edit = async (req, res) => {
  try {

    const { _id } = req.token

    const { comment, body } = req.body

    await Comment.findByIdAndUpdate(
      { _id: comment },
      {
        body,
        data: {
          edited: true
        }
      }
    )

    const editedComment = await Comment.findById({ _id: comment }, '-__v')
      .lean()
      .populate({
        path: 'user',
        select: '-__v'
      })
      .then(async doc => {

        return await generateComment(doc, _id)

      })

    return res.status(200).json({
      message: 'Comment was updated successfully.',
      comment: editedComment
    })

  } catch (error) {

    return res.status(500).json({
      error: error.message
    })

  }
}

// @desc 		Delete a comment
// @route 	POST /api/v1/comment/delete
// @access 	Public
exports.Delete = async (req, res) => {
  try {

    const { comment } = req.body

    const pinned = await Thread.findOne().where('pinned').equals(comment)

    if (Boolean(pinned)) {
      await Thread.findByIdAndUpdate(
        { _id: pinned._id },
        { pinned: null }
      )
    }

    const deleteComment = await Comment.findByIdAndDelete({ _id: comment })

    let message = deleteComment
      ? 'Comment deleted successfully.'
      : 'Comment could not be deleted.'

    return res.status(200).json({
      message
    })

  } catch (error) {

    return res.status(500).json({
      error: error.message
    })

  }
}