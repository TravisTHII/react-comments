import { Request, Response } from 'express'

import User from '../models/User'
import Thread from '../models/Thread'
import { Comment as CommentSchema } from '../models/Comment'

import { generateComment } from '../utils/generateComment'

import { CommentType } from '../types'

// @desc 		Post Reply
// @route 	POST /api/v1/comment/reply
// @access 	Public
export const Reply = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user

    const { comment, body, user } = req.body

    // get user
    const u = await User.findById({ _id: user })

    // get comment to reply to
    const c = await CommentSchema.findById({ _id: comment })

    // if comment exist and has not been deleted
    if (c) {
      // create reply
      const r = new CommentSchema({
        body,
        reply: {
          total: 0,
          hasReplies: false,
          to: c,
        },
        user: u,
        date: Date.now(),
      })

      // save reply
      await r.save()

      // get reply to return
      const reply = await CommentSchema.findById({ _id: r._id }, '-__v')
        .lean()
        .populate('user', '-__v')
        .then(async (comment: CommentType) => {
          return await generateComment(comment, _id)
        })

      return res.status(200).json({
        comment: reply,
      })
    } else {
      return res.status(500).json({
        error: 'Comment does not exist',
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc 		Get Replies
// @route 	POST /api/v1/comment/replies
// @access 	Public
export const Replies = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user

    const { comment } = req.body

    let cursor = req.query.cursor as unknown as number

    const limit = 9

    const { end, replies } = await CommentSchema.paginate(
      {
        'reply.to': comment,
      },
      {
        offset: cursor || 0,
        limit,
        lean: true,
        select: '-__v',
        sort: { date: 'desc' },
        populate: {
          path: 'user',
          select: '-__v',
        },
        customLabels: {
          docs: 'replies',
          nextPage: 'end',
        },
      }
    ).then(async (doc: any) => {
      const a = []

      for (const i of doc.replies) {
        delete i.id

        a.push(await generateComment(i, _id))
      }

      doc.replies = a

      return doc
    })

    cursor = cursor + limit || limit

    return res.status(200).json({
      paging: {
        end: !end,
        cursor,
      },
      replies,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc 		Pin a comment
// @route 	POST /api/v1/comment/pin
// @access 	Public
export const Pin = async (req: Request, res: Response) => {
  try {
    const { thread, comment } = req.body

    const { pinned } = await Thread.findOne({ _id: thread }).select('pinned')

    await Thread.findByIdAndUpdate(
      { _id: thread },
      { pinned: String(pinned) === comment ? null : comment }
    )

    return res.status(200).json({
      message: `Comment successfully ${pinned ? 'Unpinned' : 'Pinned'}.`,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc 		Edit a comment
// @route 	POST /api/v1/comment/edit
// @access 	Public
export const Edit = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user

    const { comment, body } = req.body

    await CommentSchema.findByIdAndUpdate(
      { _id: comment },
      {
        body,
        data: {
          edited: true,
        },
      }
    )

    const editedComment = await CommentSchema.findById({ _id: comment }, '-__v')
      .lean()
      .populate({
        path: 'user',
        select: '-__v',
      })
      .then(async (doc: any) => {
        return await generateComment(doc, _id)
      })

    return res.status(200).json({
      message: 'Comment was updated successfully.',
      comment: editedComment,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc 		Delete a comment
// @route 	POST /api/v1/comment/delete
// @access 	Public
export const Delete = async (req: Request, res: Response) => {
  try {
    const { comment } = req.body

    const pinned = await Thread.findOne().where('pinned').equals(comment)

    if (Boolean(pinned)) {
      await Thread.findByIdAndUpdate({ _id: pinned._id }, { pinned: null })
    }

    const deleteComment = await CommentSchema.findByIdAndDelete({
      _id: comment,
    })

    let message = deleteComment
      ? 'Comment deleted successfully.'
      : 'Comment could not be deleted.'

    return res.status(200).json({
      message,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}
