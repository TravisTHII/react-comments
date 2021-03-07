import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import ThreadReducer from './ThreadReducer'

import { THREAD } from './actions'

const initialState = {
	total: 0,
	hasPinned: false,
	paging: {},
	pinned: {},
	comments: [],
	sort: 'newest',
	loading: false,
	sortLoad: false,
	moreLoad: false,
	postLoad: false,
	fetched: false,
	error: false,
	menu: {
		dispaly: false,
		commentRef: null,
		data: []
	}
}

export const ThreadContext = createContext(initialState)

export const ThreadProvider = ({ children, thread }) => {

	const [state, dispatch] = useReducer(ThreadReducer, initialState)

	const getThread = async () => {
		try {

			dispatch({
				type: THREAD.LOAD_THREAD
			})

			const { data: { data: { total }, comments } } = await axios.get(`/api/hmd/thread?thread=${thread}`)

			dispatch({
				type: THREAD.GET_THREAD,
				payload: {
					total,
					// hasPinned,
					// paging,
					// pinned,
					comments
				}
			})

		} catch (error) {

			dispatch({
				type: THREAD.THREAD_ERROR
			})

		}
	}

	const sortThread = (sort) => {
		try {

			// if (!state.sortLoad) {

			// 	dispatch({
			// 		type: THREAD.LOAD_SORT
			// 	})

			// 	dispatch({ type: THREAD.SET_T_SORT, payload: { sort } })

			// 	setTimeout(() => {

			// 		const total = state.allComments.length
			// 		const end = total <= state.limit

			// 		const comments = end ? state.allComments : state.allComments.slice(0, state.limit)

			// 		const cursor = (comments.lastIndexOf(comments[comments.length - 1]) + 1)

			// 		const comments_sorted = comments.sort((o1, o2) => {
			// 			if (sort === 'newest') {
			// 				return o2.date.timestamp - o1.date.timestamp
			// 			} else if (sort === 'oldest') {
			// 				return o1.date.timestamp - o2.date.timestamp
			// 			}
			// 		})

			// 		dispatch({
			// 			type: THREAD.SORT_THREAD,
			// 			payload: {
			// 				paging: {
			// 					total,
			// 					end,
			// 					cursor
			// 				},
			// 				comments: comments_sorted
			// 			}
			// 		})

			// 	}, 250)

			// }

		} catch (error) {

		}
	}

	const loadMoreComments = () => {
		try {

			// if (!state.moreLoad) {

			// 	dispatch({
			// 		type: THREAD.LOAD_T_MORE
			// 	})

			// 	setTimeout(() => {

			// 		const cursor = (state.comments.lastIndexOf(state.comments[state.comments.length - 1]) + 1)

			// 		dispatch({
			// 			type: THREAD.MORE_THREAD,
			// 			payload: {
			// 				comments: state.allComments.slice(cursor, (cursor + state.limit))
			// 			}
			// 		})

			// 	}, 250)

			// }

		} catch (error) {

		}
	}

	const postComment = async (body, _id) => {
		try {

			if (!state.postLoad) {

				dispatch({
					type: THREAD.TP_LOAD
				})

				const { data: { comment } } = await axios.post('/api/hmd/thread/comment', { thread, _id, body })

				dispatch({
					type: THREAD.POST_COMMENT,
					payload: {
						comment
					}
				})

			}

		} catch (error) {

		}
	}

	return (
		<ThreadContext.Provider value={{
			state,
			getThread,
			sortThread,
			postComment,
			loadMoreComments
		}}>
			{children}
		</ThreadContext.Provider>
	)
}