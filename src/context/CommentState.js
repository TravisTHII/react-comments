import React, { createContext, useReducer } from 'react'
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

	const getReplies = () => {
		try {


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
			openReply
		}}>
			{children}
		</CommentContext.Provider>
	)
}