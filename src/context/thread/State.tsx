import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from 'react'

import { reducer } from './reducer'

import { api } from '../../utils'

import { ProviderProps, State, InitialStateType, Pinned } from './types'

const initialState: State = {
  total: 0,
  paging: {},
  comments: [],
  sort: 'newest',
  loading: false,
  sortLoad: false,
  moreLoad: false,
  postLoad: false,
  fetched: false,
  error: false,
  pinned: {} as Pinned,
  menu: {
    display: false,
    commentRef: null,
    data: [],
  },
}

export const Context = createContext({} as InitialStateType)

export const useThreadContext = () => useContext(Context)

export const Provider = ({ children, thread, token }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getThread = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_THREAD',
      })

      const {
        data: {
          data: { total },
          paging,
          pinned,
          comments,
        },
      } = await api.get(`/api/v1/thread/${thread}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch({
        type: 'GET_THREAD',
        payload: {
          total,
          paging,
          pinned,
          comments,
        },
      })
    } catch (error) {
      console.error(error)

      dispatch({
        type: 'THREAD_ERROR',
      })
    }
  }, [thread, token])

  const sortThread = async (sort: string) => {
    try {
      if (!state.sortLoad) {
        dispatch({
          type: 'LOAD_SORT',
        })

        dispatch({ type: 'SET_T_SORT', payload: { sort } })

        const {
          data: { paging, pinned, comments },
        } = await api.get(`/api/v1/thread/${thread}?sort=${sort}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        dispatch({
          type: 'SORT_THREAD',
          payload: {
            paging,
            pinned,
            comments,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const loadMoreComments = async () => {
    try {
      if (!state.moreLoad) {
        dispatch({
          type: 'LOAD_T_MORE',
        })

        const {
          data: { paging, comments },
        } = await api.get(
          `/api/v1/thread/${thread}?cursor=${state.paging.cursor}&sort=${state.sort}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        dispatch({
          type: 'MORE_THREAD',
          payload: {
            paging,
            comments,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const postComment = async (body: string, user: string) => {
    try {
      if (!state.postLoad) {
        dispatch({
          type: 'TP_LOAD',
        })

        const {
          data: { comment },
        } = await api.post(
          '/api/v1/thread/comment',
          { thread, user, body },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        dispatch({
          type: 'POST_COMMENT',
          payload: {
            comment,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getPinnedComment = useCallback(async () => {
    try {
      dispatch({
        type: 'PIN_LOADING',
      })

      const {
        data: { comment },
      } = await api.post(
        `/api/v1/thread/${thread}/pin`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      dispatch({
        type: 'PIN_COMMENT',
        payload: {
          comment,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }, [thread, token])

  const updatePinnedComment = (_id: string, type: string) => {
    if (type === 'Pin') {
      dispatch({
        type: 'UPDATE_PIN',
        payload: {
          pinned_id: _id,
          useLocalPinned: true,
        },
      })
    } else if (type === 'Unpin') {
      dispatch({
        type: 'UPDATE_PIN',
        payload: {
          pinned_id: '',
          hasPinned: false,
          useInitialPinned: false,
          comment: null,
        },
      })
    }
  }

  const getMenu = (ref: HTMLDivElement, menu: string[]) => {
    if (state.menu.commentRef !== ref) {
      destroyMenu()

      dispatch({
        type: 'GET_MENU',
        payload: {
          display: true,
          commentRef: ref,
          data: menu,
        },
      })
    } else {
      destroyMenu()
    }
  }

  const destroyMenu = () => {
    dispatch({
      type: 'GET_MENU',
      payload: {
        display: false,
        commentRef: null,
        data: [],
      },
    })
  }

  return (
    <Context.Provider
      value={{
        ...state,
        thread,
        getThread,
        sortThread,
        postComment,
        loadMoreComments,
        getMenu,
        destroyMenu,
        getPinnedComment,
        updatePinnedComment,
      }}
    >
      {children}
    </Context.Provider>
  )
}
