import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import { GlobalReducer } from './GlobalReducer'

import { GLOBAL } from './actions'

const { REACT_APP_API_URL } = process.env

const initialState = {
	user: {},
	users: [],
	token: '',
	loggedIn: false,
	thread: "",
	threads: [],
	loading: false,
	userLoading: false,
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

			const { data: { threads, users } } = await axios.get(`${REACT_APP_API_URL}/api/v1/thread/selectors`)

			selectThread(threads[0]._id)

			dispatch({
				type: GLOBAL.SELECTORS,
				payload: {
					threads,
					users
				}
			})

		} catch (error) {

			console.error(error)

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

			dispatch({
				type: GLOBAL.CHANGE_USER
			})

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

				const { data: { token } } = await axios.post(`${REACT_APP_API_URL}/api/v1/token`, { user })

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

			console.error(error)

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