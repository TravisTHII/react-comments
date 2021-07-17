export type Paging = {
  cursor?: number
  end?: boolean
}

export type Comment = {
  _id: string
  thread: string
  body: string
  date: {
    published: string
    posted: string
  }
  reply: {
    total: number
    hasReplies: boolean
  }
  user: User
  menu: string[]
  data: {
    edited: boolean
    overflow: boolean
    pinned: boolean
  }
  react: {
    key: string
  }
}

export type User = {
  _id: string
  username: string
  slug: string
  motto: string
  image: {
    avatar: string
  }
  badge: {
    title: string
    textColor: string
    backgroundColor: string
  }
  admin: boolean
}