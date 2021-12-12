import { User } from '../../types'

export type InitialStateType = {
  getSelectors: () => void
  selectThread: (thread: string) => void
  selectUser: (user: User) => void
} & State

export type State = {
  user: User
  users: User[]
  token: string
  loggedIn: boolean
  thread: string
  threads: Thread[]
  loading: boolean
  userLoading: boolean
  fetched: boolean
  updating: boolean
}

export type Action =
  | {
      type: 'LOADING'
    }
  | {
      type: 'CHANGE_USER'
    }
  | {
      type: 'SELECTORS'
      payload: {
        loading?: boolean
        fetched?: boolean
        threads: Thread[]
        users: User[]
      }
    }
  | {
      type: 'SELECT_THREAD'
      payload: { thread: string }
    }
  | {
      type: 'AUTH'
      payload: {
        loading?: boolean
        userLoading?: boolean
        loggedIn: boolean
        token: string
        user: User
      }
    }

type Thread = {
  _id: string
  name: string
}
