import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'

import { reducer } from './reducer'

import { State, InitialStateType, ProviderProps } from './types'

const initialState: State = {
  paging: {},
  results: [],
  isReplying: false,
  showMore: false,
  showReplies: false,
  localReplies: false,
  fetched: false,
  loading: false,
  replyLoad: false,
  moreLoading: false,
  pinLoad: false,
  isEditing: false,
  editLoad: false,
  deleteLoad: false,
}

export const Context = createContext({} as InitialStateType)

export const useCommentContext = () => useContext(Context)

export const Provider = ({ children, comment, token }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getReplies = async () => {
    try {
      dispatch({
        type: 'SHOW_REPLIES',
        payload: { showReplies: !state.showReplies },
      })

      if (!state.fetched && !state.showReplies) {
        dispatch({
          type: 'LOADING',
        })

        const {
          data: { paging, replies },
        } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/comment/replies`,
          { comment: comment._id },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        dispatch({
          type: 'GET_REPLIES',
          payload: {
            paging,
            replies,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const moreReplies = async () => {
    try {
      if (!state.moreLoading) {
        dispatch({
          type: 'REPLIES_LOADING',
        })

        const {
          data: { paging, replies },
        } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/comment/replies?cursor=${state.paging.cursor}`,
          { comment: comment._id },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        dispatch({
          type: 'MORE_REPLIES',
          payload: {
            paging,
            replies,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const postReply = async (body: string, user: string) => {
    try {
      if (!state.replyLoad) {
        dispatch({
          type: 'REPLY_LOADING',
        })

        dispatch({ type: 'OPEN_REPLY', payload: { isReplying: false } })

        dispatch({ type: 'SHOW_REPLIES', payload: { showReplies: true } })

        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/comment/reply`,
          { comment: comment._id, body, user },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        comment.reply.total += 1

        if (!comment.reply.hasReplies) {
          comment.reply.hasReplies = true
        }

        dispatch({
          type: 'POST_REPLY',
          payload: {
            reply: data.comment,
          },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const seeMore = () => {
    dispatch({
      type: 'SHOW_MORE',
      payload: {
        showMore: !state.showMore,
      },
    })
  }

  const openReply = () => {
    dispatch({
      type: 'OPEN_REPLY',
      payload: {
        isReplying: !state.isReplying,
      },
    })
  }

  const pinComment = async (thread: string) => {
    try {
      if (!state.pinLoad) {
        dispatch({ type: 'PIN_LOAD', payload: { pinLoad: true } })

        const {
          data: { message },
        } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/comment/pin`,
          { thread, comment: comment._id }
        )

        dispatch({ type: 'PIN_LOAD', payload: { pinLoad: false } })

        console.log(`%c${message}`, 'color: #fff; font-size: 15px')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editComment = async (body: string) => {
    try {
      if (!state.editLoad) {
        dispatch({
          type: 'EDIT_LOAD',
        })

        const {
          data: { comment: editedComment, message },
        } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/comment/edit`,
          { comment: comment._id, body },
          { headers: { Authorization: `Bearer ${token}` } }
        )

        comment.body = editedComment.body
        comment.data = editedComment.data

        dispatch({
          type: 'EDIT',
        })

        console.log(`%c${message}`, 'color: #fff; font-size: 15px')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const startEditing = () => {
    if (!state.editLoad) {
      dispatch({
        type: 'START_EDITING',
        payload: {
          isEditing: !state.isEditing,
        },
      })
    }
  }

  const deleteComment = async (deleteRef: any) => {
    try {
      dispatch({
        type: 'DELETE_LOAD',
        payload: {
          deleteLoad: true,
        },
      })

      const {
        data: { message },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/comment/delete`,
        { comment: comment._id }
      )

      deleteRef.parentNode.removeChild(deleteRef)

      dispatch({
        type: 'DELETE_LOAD',
        payload: {
          deleteLoad: false,
        },
      })

      console.log(`%c${message}`, 'color: #fff; font-size: 15px')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Context.Provider
      value={{
        ...state,
        comment,
        getReplies,
        moreReplies,
        seeMore,
        openReply,
        postReply,
        pinComment,
        editComment,
        startEditing,
        deleteComment,
      }}
    >
      {children}
    </Context.Provider>
  )
}
