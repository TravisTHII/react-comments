import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useReducer,
} from 'react'

import { reducer } from './reducer'

import { api } from '../../utils'

import { State, InitialStateType } from './types'

import { User } from '../../types'

const initialState: State = {
  user: {} as User,
  users: [],
  token: '',
  loggedIn: false,
  thread: '',
  threads: [],
  loading: false,
  userLoading: false,
  fetched: false,
  updating: false,
}

export const Context = createContext({} as InitialStateType)

export const useGlobalContext = () => useContext(Context)

export const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getSelectors = useCallback(async () => {
    try {
      dispatch({
        type: 'LOADING',
      })

      const {
        data: { threads, users },
      } = await api.get('/api/v1/thread/selectors')

      selectThread(threads[0]._id)

      dispatch({
        type: 'SELECTORS',
        payload: {
          threads,
          users,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const selectThread = (thread: string) => {
    dispatch({
      type: 'SELECT_THREAD',
      payload: {
        thread,
      },
    })
  }

  const selectUser = async (user: User) => {
    try {
      dispatch({
        type: 'CHANGE_USER',
      })

      if (state.loggedIn && state.user === user) {
        dispatch({
          type: 'AUTH',
          payload: {
            loggedIn: false,
            token: '',
            user: {} as User,
          },
        })
      } else {
        const {
          data: { token },
        } = await api.post('/api/v1/token', {
          user,
        })

        dispatch({
          type: 'AUTH',
          payload: {
            user: user,
            loggedIn: true,
            token,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Context.Provider
      value={{
        ...state,
        getSelectors,
        selectThread,
        selectUser,
      }}
    >
      {children}
    </Context.Provider>
  )
}
