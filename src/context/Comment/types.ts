import { Paging, Comment } from 'types'

export interface ProviderProps {
  children: React.ReactNode
  comment: Comment
  token: string
}

export type InitialStateType = {
  comment: Comment
  getReplies: () => void
  moreReplies: () => void
  postReply: (body: string, user: string) => void
  seeMore: () => void
  openReply: () => void
  pinComment: (thread: string) => Promise<any>
  editComment: (body: string) => void
  startEditing: () => void
  deleteComment: (deleteRef: React.ReactNode) => void
} & State

export type State = {
  paging: Paging,
  results: Comment[],
  isReplying: boolean,
  showMore: boolean,
  showReplies: boolean,
  localReplies: boolean,
  fetched: boolean,
  loading: boolean,
  replyLoad: boolean,
  moreLoading: boolean,
  pinLoad: boolean,
  isEditing: boolean,
  editLoad: boolean,
  deleteLoad: boolean
}

export enum COMMENT {
  GET_REPLIES = 'GET_REPLIES',
  LOADING = 'LOADING',
  OPEN_REPLY = 'OPEN_REPLY',
  SHOW_MORE = 'SHOW_MORE',
  POST_REPLY = 'POST_REPLY',
  REPLY_LOADING = 'REPLY_LOADING',
  SHOW_REPLIES = 'SHOW_REPLIES',
  MORE_REPLIES = 'MORE_REPLIES',
  REPLIES_LOADING = 'REPLIES_LOADING',
  PIN_LOAD = 'PIN_LOAD',
  EDIT = 'EDIT',
  EDIT_LOAD = 'EDIT_LOAD',
  START_EDITING = 'START_EDITING',
  DELETE_LOAD = 'DELETE_LOAD',
}

export type Action =
  | {
    type: COMMENT.GET_REPLIES
    payload: {
      fetched?: boolean
      loading?: boolean
      paging: Paging
      replies: Comment[]
    }
  }
  | {
    type: COMMENT.LOADING
    payload?: {}
  }
  | {
    type: COMMENT.OPEN_REPLY
    payload: { isReplying: boolean }
  }
  | {
    type: COMMENT.SHOW_MORE
    payload: { showMore: boolean }
  }
  | {
    type: COMMENT.POST_REPLY
    payload: {
      replyLoad?: boolean
      localReplies?: boolean
      reply: Comment
    }
  }
  | {
    type: COMMENT.REPLY_LOADING
    payload?: {}
  }
  | {
    type: COMMENT.SHOW_REPLIES
    payload: { showReplies: boolean }
  }
  | {
    type: COMMENT.MORE_REPLIES
    payload: {
      moreLoading?: boolean
      paging: Paging
      replies: Comment[]
    }
  }
  | {
    type: COMMENT.REPLIES_LOADING
    payload?: {}
  }
  | {
    type: COMMENT.PIN_LOAD
    payload: { pinLoad: boolean }
  }
  | {
    type: COMMENT.EDIT
    payload?: {
      editLoad: boolean
      isEditing: boolean
    }
  }
  | {
    type: COMMENT.EDIT_LOAD
    payload?: {}
  }
  | {
    type: COMMENT.START_EDITING
    payload: { isEditing: boolean }
  }
  | {
    type: COMMENT.DELETE_LOAD
    payload: { deleteLoad: boolean }
  }