import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import { CommentReducer } from './CommentReducer'

import { COMMENT } from './actions'

const initialState = {
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
	deleteLoad: false
}

export const CommentContext = createContext(initialState)

export const CommentProvider = ({ children, comment, token }) => {

	const [state, dispatch] = useReducer(CommentReducer, initialState)

	const getReplies = async () => {
		try {

			dispatch({ type: COMMENT.SHOW_REPLIES, payload: { showReplies: !state.showReplies } })

			if (!state.fetched && !state.showReplies) {

				dispatch({
					type: COMMENT.LOADING
				})

				const {
					data: {
						paging,
						replies
					}
				} = await axios.post(
					'/api/v1/comment/replies',
					{ comment: comment._id },
					{ headers: { '_token': token } }
				)

				dispatch({
					type: COMMENT.GET_REPLIES,
					payload: {
						paging,
						replies
					}
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
					type: COMMENT.REPLIES_LOADING
				})

				const {
					data: {
						paging,
						replies
					}
				} = await axios.post(
					`/api/v1/comment/replies?cursor=${state.paging.cursor}`,
					{ comment: comment._id },
					{ headers: { '_token': token } }
				)

				dispatch({
					type: COMMENT.MORE_REPLIES,
					payload: {
						paging,
						replies
					}
				})

			}

		} catch (error) {

			console.error(error)

		}
	}

	const postReply = async (body, user) => {
		try {

			if (!state.replyLoad) {

				dispatch({
					type: COMMENT.REPLY_LOADING
				})

				dispatch({ type: COMMENT.OPEN_REPLY, payload: { isReplying: false } })

				dispatch({ type: COMMENT.SHOW_REPLIES, payload: { showReplies: true } })

				const {
					data
				} = await axios.post(
					'/api/v1/comment/reply',
					{ comment: comment._id, body, user },
					{ headers: { '_token': token } }
				)

				comment.reply.total += 1

				if (!comment.reply.hasReplies) {
					comment.reply.hasReplies = true
				}

				dispatch({
					type: COMMENT.POST_REPLY,
					payload: {
						reply: data.comment
					}
				})

			}

		} catch (error) {

			console.error(error)

		}
	}

	const seeMore = () => {
		dispatch({
			type: COMMENT.SHOW_MORE,
			payload: {
				showMore: !state.showMore
			}
		})
	}

	const openReply = () => {
		dispatch({
			type: COMMENT.OPEN_REPLY,
			payload: {
				isReplying: !state.isReplying
			}
		})
	}

	const pinComment = async (thread) => {
		try {

			dispatch({ type: COMMENT.PIN_LOAD, payload: { pinLoad: true } })

			const {
				data: {
					message
				}
			} = await axios.post(
				'/api/v1/comment/pin',
				{ thread, comment: comment._id }
			)

			dispatch({ type: COMMENT.PIN_LOAD, payload: { pinLoad: false } })

			console.log(`%c${message}`, 'color: #fff; font-size: 15px')

			return Promise

		} catch (error) {

			console.error(error)

		}
	}

	const editComment = async (body) => {
		try {

			if (!state.editLoad) {

				dispatch({
					type: COMMENT.EDIT_LOAD
				})

				const {
					data: {
						comment: editedComment,
						message
					}
				} = await axios.post(
					'/api/v1/comment/edit',
					{ comment: comment._id, body },
					{ headers: { '_token': token } }
				)

				comment.body = editedComment.body
				comment.data = editedComment.data

				dispatch({
					type: COMMENT.EDIT
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
				type: COMMENT.START_EDITING,
				payload: {
					isEditing: !state.isEditing
				}
			})

		}
	}

	const deleteComment = async (deleteRef) => {
		try {

			dispatch({
				type: COMMENT.DELETE_LOAD,
				payload: {
					deleteLoad: true
				}
			})

			const { data: { message } } = await axios.post('/api/v1/comment/delete', { comment: comment._id })

			deleteRef.parentNode.removeChild(deleteRef)

			dispatch({
				type: COMMENT.DELETE_LOAD,
				payload: {
					deleteLoad: false
				}
			})

			console.log(`%c${message}`, 'color: #fff; font-size: 15px')

		} catch (error) {

			console.error(error)

		}
	}

	return (
		<CommentContext.Provider value={{
			state,
			comment,
			getReplies,
			moreReplies,
			seeMore,
			openReply,
			postReply,
			pinComment,
			editComment,
			startEditing,
			deleteComment
		}}>
			{children}
		</CommentContext.Provider>
	)
}