import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import CommentReducer from './CommentReducer'

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
	moreLoading: false
}

export const CommentContext = createContext(initialState)

export const CommentProvider = ({ children, comment }) => {

	const [state, dispatch] = useReducer(CommentReducer, initialState)

	const getReplies = async () => {
		try {

			dispatch({ type: COMMENT.SHOW_REPLIES, payload: { showReplies: !state.showReplies } })

			if (!state.fetched && !state.showReplies) {

				dispatch({
					type: COMMENT.LOADING
				})

				const { data: { paging, replies } } = await axios.post('/api/hmd/comment/replies', { comment: comment._id })

				dispatch({
					type: COMMENT.GET_REPLIES,
					payload: {
						paging,
						replies
					}
				})

			}

		} catch (error) {

		}
	}

	const moreReplies = () => {
		try {

			if (!state.moreLoading) {

				dispatch({
					type: COMMENT.REPLIES_LOADING
				})

				setTimeout(() => {

					const cursor = (state.results.lastIndexOf(state.results[state.results.length - 1]) + 1)

					dispatch({
						type: COMMENT.MORE_REPLIES,
						payload: {
							replies: state.allReplies.slice(cursor, (cursor + state.limit))
						}
					})

				}, 250)

			}

		} catch (error) {

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

				const { data } = await axios.post('/api/hmd/comment/reply', { comment: comment._id, body, user })

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

	return (
		<CommentContext.Provider value={{
			state,
			comment,
			getReplies,
			moreReplies,
			seeMore,
			openReply,
			postReply
		}}>
			{children}
		</CommentContext.Provider>
	)
}