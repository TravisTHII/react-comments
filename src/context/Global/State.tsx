import React, { createContext, FC, useContext, useReducer } from 'react'
import axios from 'axios'

import { reducer } from './reducer'

import { State, InitialStateType, GLOBAL } from './types'

import { User } from 'types'

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
  updating: false
}

export const Context = createContext({} as InitialStateType)

export const useGlobalContext = () => useContext(Context)

export const Provider: FC = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const getSelectors = async () => {
    try {

      dispatch({
        type: GLOBAL.LOADING
      })

      console.log(process.env);
      

      const { data: { threads, users } } = await axios.get(`${process.env.API_URL}/api/v1/thread/selectors`)

      selectThread(threads[0]._id)

      dispatch({
        type: GLOBAL.SELECTORS,
        payload: {
          threads,
          users
        }
      })

    } catch (error) {

      console.error(error)

    }
  }

  const selectThread = (thread: string) => {
    dispatch({
      type: GLOBAL.SELECT_THREAD,
      payload: {
        thread
      }
    })
  }

  const selectUser = async (user: User) => {
    try {

      dispatch({
        type: GLOBAL.CHANGE_USER
      })

      if (state.loggedIn && state.user === user) {

        dispatch({
          type: GLOBAL.AUTH,
          payload: {
            loggedIn: false,
            token: '',
            user: null
          }
        })

      } else {

        const { data: { token } } = await axios.post(`${process.env.API_URL}/api/v1/token`, { user })

        dispatch({
          type: GLOBAL.AUTH,
          payload: {
            user: user,
            loggedIn: true,
            token
          }
        })

      }

    } catch (error) {

      console.error(error)

    }
  }

  return (
    <Context.Provider value={{
      ...state,
      getSelectors,
      selectThread,
      selectUser
    }}>
      {children}
    </Context.Provider>
  )
}