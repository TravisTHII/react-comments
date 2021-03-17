import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import GlobalReducer from './GlobalReducer'

import { GLOBAL } from './actions'

const initialState = {
	thread: "",
	threads: [],
	user: {},
	users: [],
	loading: false,
	fetched: false
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(GlobalReducer, initialState)

	const getThreadsAndUsers = async () => {
		try {

			dispatch({
				type: GLOBAL.LOADING
			})

			const { data: { threads, users } } = await axios.get('/api/hmd/thread/all')

			selectThread(threads[1]._id)
			selectUser(users[2])

			dispatch({
				type: GLOBAL.GET_THREADS_AND_USERS,
				payload: {
					threads,
					users
				}
			})

		} catch (error) {

		}
	}

	const selectThread = (thread) => {
		dispatch({
			type: GLOBAL.SELECT_THREAD,
			payload: {
				thread
			}
		})
	}

	const selectUser = (user) => {
		dispatch({
			type: GLOBAL.SELECT_USER,
			payload: {
				user
			}
		})
	}

	return (
		<GlobalContext.Provider value={{
			state,
			getThreadsAndUsers,
			selectThread,
			selectUser
		}}>
			{children}
		</GlobalContext.Provider>
	)
}