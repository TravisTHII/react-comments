import { ReactNode } from 'react'

import { Paging, Comment } from '../../types'

export interface ProviderProps {
  children: ReactNode
  thread: string
  token: string
}

export type InitialStateType = {
  thread: string
  getThread: () => void
  sortThread: (sort: string) => void
  postComment: (body: string, user: string) => void
  loadMoreComments: () => void
  getMenu: (ref: HTMLDivElement, menu: string[]) => void
  destroyMenu: () => void
  getPinnedComment: () => void
  updatePinnedComment: (_id: string, type: string) => void
} & State

export type State = {
  total: number
  paging: Paging
  comments: Comment[]
  sort: string
  loading: boolean
  sortLoad: boolean
  moreLoad: boolean
  postLoad: boolean
  fetched: boolean
  error: boolean
  pinned: Pinned
  menu: Menu
}

export type Action =
  | {
    type: 'GET_THREAD'
    payload: {
      loading?: boolean
      fetched?: boolean
      total: number
      paging: Paging
      pinned: Pinned
      comments: Comment[]
    }
  }
  | {
    type: 'SORT_THREAD'
    payload: {
      sortLoad?: boolean
      paging: Paging
      pinned: Pinned
      comments: Comment[]
    }
  }
  | {
    type: 'MORE_THREAD'
    payload: {
      moreLoad?: boolean
      paging: Paging
      comments: Comment[]
    }
  }
  | {
    type: 'POST_COMMENT'
    payload: {
      postLoad?: boolean
      comment: Comment
    }
  }
  | {
    type: 'PIN_COMMENT'
    payload: {
      comment: Comment
      loading?: boolean
    }
  }
  | {
    type: 'UPDATE_PIN'
    payload: {
      pinned_id: string,
      useLocalPinned: boolean
    } | {
      pinned_id: string,
      hasPinned: boolean,
      useInitialPinned: boolean,
      comment: null
    }
  }
  | {
    type: 'GET_MENU'
    payload: Menu
  }
  | {
    type: 'SET_T_SORT'
    payload: {
      sort: string
    }
  }
  | {
    type: 'LOAD_THREAD'
  }
  | {
    type: 'LOAD_SORT'
  }
  | {
    type: 'LOAD_T_MORE'
  }
  | {
    type: 'TP_LOAD'
  }
  | {
    type: 'PIN_LOADING'
  }
  | {
    type: 'THREAD_ERROR'
    payload?: {
      loading?: boolean
      error?: boolean
    }
  }

export type Pinned = {
  pinned_id: string
  hasPinned: boolean
  useInitialPinned: boolean
  useLocalPinned: boolean
  comment: Comment | null
  loading: boolean
}

type Menu = {
  display: boolean
  commentRef: HTMLDivElement | null
  data: string[]
}