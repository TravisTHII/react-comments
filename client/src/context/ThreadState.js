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

export const ThreadProvider = ({ children, thread, token }) => {

	const [state, dispatch] = useReducer(ThreadReducer, initialState)

	const getThread = async () => {
		try {

			dispatch({
				type: THREAD.LOAD_THREAD
			})

			const { data: { data: { total, hasPinned }, paging, pinned, comments } } = await axios.get(`/api/v1/thread/${thread}`, { headers: { '_token': token } })

			dispatch({
				type: THREAD.GET_THREAD,
				payload: {
					total,
					hasPinned,
					paging,
					pinned,
					comments
				}
			})

		} catch (error) {

			dispatch({
				type: THREAD.THREAD_ERROR
			})

		}
	}

	const sortThread = async (sort) => {
		try {

			if (!state.sortLoad) {

				dispatch({
					type: THREAD.LOAD_SORT
				})

				dispatch({ type: THREAD.SET_T_SORT, payload: { sort } })

				const { data: { data: { hasPinned }, paging, pinned, comments } } = await axios.get(`/api/v1/thread/${thread}?sort=${sort}`)

				dispatch({
					type: THREAD.SORT_THREAD,
					payload: {
						hasPinned,
						paging,
						pinned,
						comments
					}
				})

			}

		} catch (error) {

		}
	}

	const loadMoreComments = async () => {
		try {

			if (!state.moreLoad) {

				dispatch({
					type: THREAD.LOAD_T_MORE
				})

				const { data: { paging, comments } } = await axios.get(`/api/v1/thread/${thread}?cursor=${state.paging.cursor}&sort=${state.sort}`)

				dispatch({
					type: THREAD.MORE_THREAD,
					payload: {
						paging,
						comments
					}
				})

			}

		} catch (error) {

		}
	}

	const postComment = async (body, user) => {
		try {

			if (!state.postLoad) {

				dispatch({
					type: THREAD.TP_LOAD
				})

				const { data: { comment } } = await axios.post('/api/v1/thread/comment', { thread, user, body })

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

	const getMenu = (ref, menu) => {
		if (state.menu.commentRef !== ref) {

			destroyMenu()
			dispatch({ type: THREAD.GET_MENU, payload: { commentRef: ref, menu } })

		} else {

			destroyMenu()

		}
	}

	const destroyMenu = () => {
		dispatch({
			type: THREAD.DESTROY_MENU
		})
	}

	return (
		<ThreadContext.Provider value={{
			state,
			getThread,
			sortThread,
			postComment,
			loadMoreComments,
			getMenu,
			destroyMenu,
		}}>
			{children}
		</ThreadContext.Provider>
	)
}