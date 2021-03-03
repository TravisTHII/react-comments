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
	moreLoading: false
}

export const CommentContext = createContext(initialState)

export const CommentProvider = ({ children, comment }) => {

	const [state, dispatch] = useReducer(CommentReducer, initialState)

	const getReplies = () => {
		try {


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

			}, 250);


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
			seeMore,
			openReply,
			postReply
		}}>
			{children}
		</CommentContext.Provider>
	)
}