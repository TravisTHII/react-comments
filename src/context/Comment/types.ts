import { Paging, Comment } from '../../types'

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
  paging: Paging
  results: Comment[]
  isReplying: boolean
  showMore: boolean
  showReplies: boolean
  localReplies: boolean
  fetched: boolean
  loading: boolean
  replyLoad: boolean
  moreLoading: boolean
  pinLoad: boolean
  isEditing: boolean
  editLoad: boolean
  deleteLoad: boolean
}

export type Action =
  | {
      type: 'GET_REPLIES'
      payload: {
        fetched?: boolean
        loading?: boolean
        paging: Paging
        replies: Comment[]
      }
    }
  | {
      type: 'LOADING'
    }
  | {
      type: 'OPEN_REPLY'
      payload: { isReplying: boolean }
    }
  | {
      type: 'SHOW_MORE'
      payload: { showMore: boolean }
    }
  | {
      type: 'POST_REPLY'
      payload: {
        replyLoad?: boolean
        localReplies?: boolean
        reply: Comment
      }
    }
  | {
      type: 'REPLY_LOADING'
    }
  | {
      type: 'SHOW_REPLIES'
      payload: { showReplies: boolean }
    }
  | {
      type: 'MORE_REPLIES'
      payload: {
        moreLoading?: boolean
        paging: Paging
        replies: Comment[]
      }
    }
  | {
      type: 'REPLIES_LOADING'
    }
  | {
      type: 'PIN_LOAD'
      payload: { pinLoad: boolean }
    }
  | {
      type: 'EDIT'
      payload?: {
        editLoad: boolean
        isEditing: boolean
      }
    }
  | {
      type: 'EDIT_LOAD'
    }
  | {
      type: 'START_EDITING'
      payload: { isEditing: boolean }
    }
  | {
      type: 'DELETE_LOAD'
      payload: { deleteLoad: boolean }
    }
