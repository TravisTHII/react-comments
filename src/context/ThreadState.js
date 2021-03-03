import React, { createContext, useReducer } from 'react'
import ThreadReducer from './ThreadReducer'

import { THREAD } from './actions'

import { SEED } from '../data'

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

export const ThreadProvider = ({ children }) => {

	const [state, dispatch] = useReducer(ThreadReducer, initialState)

	const getThread = () => {
		try {

			dispatch({
				type: THREAD.LOAD_THREAD
			})

			setTimeout(() => {

				dispatch({
					type: THREAD.GET_THREAD,
					payload: {
						...SEED,
						total: SEED.comments.length
					}
				})

			}, 250);

		} catch (error) {


		}
	}

	return (
		<ThreadContext.Provider value={{
			state,
			getThread
		}}>
			{children}
		</ThreadContext.Provider>
	)
}