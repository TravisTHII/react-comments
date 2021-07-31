import { Request, Response } from 'express'

import { Comment as CommentModel } from '../models/Comment'
import Thread from '../models/Thread'
import User from '../models/User'

import { generateComment } from '../utils/generateComment'
import { getPinnedComment } from '../utils/getPinnedComment'

// @desc 		Get users & threads
// @route 	GET /api/v1/thread/selectors
// @access 	Public
export const Selectors = async (_: Request, res: Response) => {
  try {
    const threads = await Thread.find().select('_id name').sort({ name: 'asc' })

    const users = await User.find().select('-__v').sort({ username: 'asc' })

    return res.status(200).json({
      threads,
      users,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc 		Create a thread
// @route 	GET /api/v1/thread/create
// @access 	Public
export const createThread = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) throw new Error('Please enter a thread name.')

    const thread = new Thread({
      name,
    })

    await thread.save()

    return res.status(200).json({
      message: `successfully created Thread ${name}!`,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc 		Get a thread
// @route 	GET /api/v1/thread
// @access 	Public
export const getThread = async (req: Request, res: Response) => {
  try {
    const { _id } = req.token

    const { _thread_name } = req.params

    let { sort } = req.query

    let cursor = req.query.cursor as unknown as number

    const limit = 18

    const pinned = await getPinnedComment(_thread_name, _id)

    const { total, end, comments } = await CommentModel.paginate(
      {
        thread: _thread_name,
      },
      {
        offset: cursor || 0,
        limit,
        lean: true,
        select: '-__v',
        sort: { date: sort === 'oldest' ? 'asc' : 'desc' },
        populate: {
          path: 'user',
          select: '-__v',
        },
        customLabels: {
          totalDocs: 'total',
          docs: 'comments',
          nextPage: 'end',
        },
      }
    ).then(async (doc: any) => {
      const a = []

      for (let i of doc.comments) {
        delete i.id

        a.push(await generateComment(i, _id))
      }

      doc.comments = a

      return doc
    })

    cursor = cursor + limit || limit

    return res.status(200).json({
      data: {
        total,
      },
      paging: {
        end: !end,
        cursor,
      },
      pinned: {
        pinned_id: Boolean(pinned) ? pinned._id : '',
        hasPinned: Boolean(pinned),
        useInitialPinned: Boolean(pinned),
        comment: pinned || {},
      },
      comments,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc Post a comment
// @route POST /api/v1/thread/comment
// @access Public
export const Comment = async (req: Request, res: Response) => {
  try {
    const { _id } = req.token

    const { thread, user, body } = req.body

    // if no user throw error
    if (!user) throw new Error()

    // get user
    const u = await User.findById({ _id: user })

    // create comment
    const c = new CommentModel({
      thread,
      body,
      user: u,
      date: Date.now(),
    })

    // save comment to comments document
    await c.save()

    // get comment to return
    const comment = await CommentModel.findById({ _id: c._id }, '-__v')
      .lean()
      .populate('user', '-__v')
      .then(async (comment) => {
        return await generateComment(comment, _id)
      })

    return res.status(200).json({
      comment,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

// @desc Get pinned comment
// @route POST /api/v1/thread/pin
// @access Public
export const Pin = async (req: Request, res: Response) => {
  try {
    const { _id } = req.token

    const { _thread_name } = req.params

    const comment = await getPinnedComment(_thread_name, _id)

    return res.status(200).json({
      comment,
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}
