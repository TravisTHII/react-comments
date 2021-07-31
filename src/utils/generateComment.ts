import { format, formatDistance } from 'date-fns'
import uniqueString from 'unique-string'

import User from '../models/User'
import Thread from '../models/Thread'
import { Comment as CommentSchema } from '../models/Comment'

import { CommentType } from '../types'

export const generateComment = async (comment: CommentType, _id: string) => {
  const total = await CommentSchema.find({
    'reply.to': comment._id,
  }).countDocuments()

  const pinned = await Thread.findOne().where('pinned').equals(comment._id)

  const {
    data: { edited },
  } = await CommentSchema.findById({ _id: comment._id }).select('data')

  const isPinned = Boolean(pinned)

  return {
    ...comment,
    reply: {
      ...comment.reply,
      total,
      hasReplies: total ? true : false,
    },
    date: {
      published: formatDistance(comment.date, Date.now(), { addSuffix: true }),
      posted: format(comment.date, 'MMMM do, y | h:mm a'),
    },
    menu: _id ? await generateMenu(comment, _id, isPinned) : null,
    data: {
      pinned: isPinned,
      edited,
      overflow: isOverflowed(comment.body),
    },
    react: {
      key: uniqueString(),
    },
  }
}

const isOverflowed = (content: string) => {
  let s = content.split(/\r\n|\r|\n/m)

  return s.length > 9 || content.length > 999 ? true : false
}

const generateMenu = async (
  comment: CommentType,
  _id: string,
  pinned: boolean
) => {
  let menu

  const { admin } = await User.findById({ _id }).select('-_id admin').lean()

  const myComment = String(comment.user._id) === _id

  const isPinned = pinned ? 'Unpin' : 'Pin'

  if (admin) {
    if (myComment) {
      menu = [isPinned, 'Edit', 'Delete']
    } else {
      menu = [isPinned, 'Delete', 'Report']
    }
  } else {
    if (myComment) {
      menu = ['Edit', 'Delete']
    } else {
      menu = ['Report']
    }
  }

  return menu
}
