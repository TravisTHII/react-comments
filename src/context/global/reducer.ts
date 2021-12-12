import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {
  if (action.type === 'SELECTORS') {
    return {
      ...state,
      loading: false,
      fetched: true,
      threads: action.payload.threads,
      users: action.payload.users,
    }
  }

  if (action.type === 'SELECT_THREAD') {
    return {
      ...state,
      thread: action.payload.thread,
    }
  }

  if (action.type === 'AUTH') {
    return {
      ...state,
      loading: false,
      userLoading: false,
      loggedIn: action.payload.loggedIn,
      token: action.payload.token,
      user: action.payload.user,
    }
  }

  if (action.type === 'CHANGE_USER') {
    return {
      ...state,
      userLoading: true,
    }
  }

  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: true,
    }
  }

  return state
}
