export type CommentType = {
  _id: string
  date: Date
  body: string
  reply: {
    total: number
    hasReplies: boolean
  }
  user: User
}

export type User = {
  _id: string
}

export type Token = {
  _id: string
}
