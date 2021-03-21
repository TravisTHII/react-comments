import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import GlobalReducer from './GlobalReducer'

import { GLOBAL } from './actions'

const initialState = {
	thread: "",
	threads: [],
	user: {},
	users: [],
	token: '',
	loading: false,
	fetched: false
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(GlobalReducer, initialState)

	const getSelectors = async () => {
		try {

			dispatch({
				type: GLOBAL.LOADING
			})

			const { data: { threads, users, token } } = await axios.get('/api/v1/thread/selectors')

			selectThread(threads[1]._id)
			selectUser(users[2])

			dispatch({
				type: GLOBAL.GET_THREADS_AND_USERS,
				payload: {
					threads,
					users,
					token
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
			getSelectors,
			selectThread,
			selectUser
		}}>
			{children}
		</GlobalContext.Provider>
	)
}