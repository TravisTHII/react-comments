import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import GlobalReducer from './GlobalReducer'

import { GLOBAL } from './actions'

const initialState = {
	user: {},
	users: [],
	token: '',
	loggedIn: false,
	thread: "",
	threads: [],
	loading: false,
	fetched: false,
	updating: false
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(GlobalReducer, initialState)

	const getSelectors = async () => {
		try {

			dispatch({
				type: GLOBAL.LOADING
			})

			const { data: { threads, users } } = await axios.get('/api/v1/thread/selectors')

			selectThread(threads[1]._id)

			dispatch({
				type: GLOBAL.SELECTORS,
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

	const selectUser = async (user) => {
		try {

			if (state.loggedIn && state.user === user) {

				dispatch({
					type: GLOBAL.AUTH,
					payload: {
						loggedIn: false,
						token: "",
						user: {}
					}
				})

			} else {

				dispatch({
					type: GLOBAL.LOADING
				})

				const { data: { token } } = await axios.post('/api/v1/token', { user })

				dispatch({
					type: GLOBAL.AUTH,
					payload: {
						user: user,
						loggedIn: true,
						token
					}
				})

			}

		} catch (error) {

		}
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