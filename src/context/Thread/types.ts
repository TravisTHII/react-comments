import { ReactNode } from 'react'

import { Paging, Comment } from 'types'

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

export enum THREAD {
  GET_THREAD = 'GET_THREAD',
  SORT_THREAD = 'SORT_THREAD',
  LOAD_THREAD = 'LOAD_THREAD',
  MORE_THREAD = 'MORE_THREAD',
  LOAD_SORT = 'LOAD_SORT',
  SET_T_SORT = 'SET_T_SORT',
  LOAD_T_MORE = 'LOAD_T_MORE',
  TP_LOAD = 'TP_LOAD',
  POST_COMMENT = 'POST_COMMENT',
  GET_MENU = 'GET_MENU',
  PIN_COMMENT = 'PIN_COMMENT',
  UPDATE_PIN = 'UPDATE_PIN',
  PIN_LOADING = 'PIN_LOADING',
  THREAD_ERROR = 'THREAD_ERROR'
}

export type Action =
  | {
    type: THREAD.GET_THREAD
    payload: {
      loading?: boolean
      fetched?: boolean
      total: number
      paging: Paging
      pinned: Comment
      comments: Comment[]
    }
  }
  | {
    type: THREAD.SORT_THREAD
    payload: {
      sortLoad?: boolean
      paging: Paging
      pinned: Comment
      comments: Comment[]
    }
  }
  | {
    type: THREAD.MORE_THREAD
    payload: {
      moreLoad?: boolean
      paging: Paging
      comments: Comment[]
    }
  }
  | {
    type: THREAD.POST_COMMENT
    payload: {
      postLoad?: boolean
      comment: Comment
    }
  }
  | {
    type: THREAD.PIN_COMMENT
    payload: {
      comment: Comment
      loading?: boolean
    }
  }
  | {
    type: THREAD.UPDATE_PIN
    payload: {
      pinned_id: string,
      useLocalPinned: boolean
    } | {
      pinned_id: string,
      hasPinned: boolean,
      useInitialPinned: boolean,
      comment: {}
    }
  }
  | {
    type: THREAD.GET_MENU
    payload: Menu
  }
  | {
    type: THREAD.SET_T_SORT
    payload: {
      sort: string
    }
  }
  | {
    type: THREAD.LOAD_THREAD
    payload?: {}
  }
  | {
    type: THREAD.LOAD_SORT
    payload?: {}
  }
  | {
    type: THREAD.LOAD_T_MORE
    payload?: {}
  }
  | {
    type: THREAD.TP_LOAD
    payload?: {}
  }
  | {
    type: THREAD.PIN_LOADING
    payload?: {}
  }
  | {
    type: THREAD.THREAD_ERROR
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
  comment: Comment
  loading: boolean
}

type Menu = {
  display: boolean
  commentRef: HTMLDivElement | null
  data: string[]
}