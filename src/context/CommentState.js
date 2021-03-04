import React, { createContext, useReducer } from 'react'
import CommentReducer from './CommentReducer'

import { COMMENT } from './actions'

import { newComment } from '../utils/newComment'

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
	limit: 9,
	allReplies: []
}

export const CommentContext = createContext(initialState)

export const CommentProvider = ({ children, comment }) => {

	const [state, dispatch] = useReducer(CommentReducer, initialState)

	const getReplies = () => {
		try {

			dispatch({ type: COMMENT.SHOW_REPLIES, payload: { showReplies: !state.showReplies } })

			if (!state.fetched && !state.showReplies) {

				dispatch({
					type: COMMENT.LOADING
				})

				setTimeout(() => {

					const total = state.results.length
						, end = total <= state.limit
						, cursor = state.results.lastIndexOf(state.results[state.results.length - 1])

					dispatch({
						type: COMMENT.GET_REPLIES,
						payload: {
							paging: {
								total,
								end,
								cursor
							},
							replies: end ? state.results : state.results.slice(0, state.limit),
							allReplies: state.results
						}
					})

				}, 250)

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
							paging: {
								...state.paging
							},
							replies: state.allReplies.slice(cursor, (cursor + state.limit))
						}
					})

				}, 250)

			}

		} catch (error) {

		}
	}

	const postReply = (body, user) => {
		try {

			dispatch({
				type: COMMENT.REPLY_LOADING
			})

			dispatch({ type: COMMENT.OPEN_REPLY, payload: { isReplying: false } })

			dispatch({ type: COMMENT.SHOW_REPLIES, payload: { showReplies: true } })

			setTimeout(() => {

				comment.reply.total += 1

				if (!comment.reply.has_replies) {
					comment.reply.has_replies = true
				}

				const reply = newComment(user, body, Date.now())

				dispatch({
					type: COMMENT.POST_REPLY,
					payload: {
						reply
					}
				})

			}, 0)


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