import { User } from 'types'

export type InitialStateType = {
  getSelectors: () => void
  selectThread: (thread: string) => void
  selectUser: (user: User) => void
} & State

export type State = {
  user: User,
  users: User[],
  token: string,
  loggedIn: boolean,
  thread: string,
  threads: Thread[],
  loading: boolean,
  userLoading: boolean,
  fetched: boolean,
  updating: boolean
}

export enum GLOBAL {
  LOADING = 'LOADING',
  CHANGE_USER = 'CHANGE_USER',
  SELECTORS = 'SELECTORS',
  SELECT_THREAD = 'SELECT_THREAD',
  AUTH = 'AUTH',
}

export type Action =
  | {
    type: GLOBAL.LOADING
    payload?: {}
  }
  | {
    type: GLOBAL.CHANGE_USER
    payload?: {}
  }
  | {
    type: GLOBAL.SELECTORS
    payload: {
      loading?: boolean
      fetched?: boolean
      threads: Thread[]
      users: User[]
    }
  }
  | {
    type: GLOBAL.SELECT_THREAD
    payload: { thread: string }
  }
  | {
    type: GLOBAL.AUTH
    payload: {
      loading?: boolean
      userLoading?: boolean
      loggedIn: boolean,
      token: string,
      user: User | null
    }
  }

type Thread = {
  _id: string
  name: string
}