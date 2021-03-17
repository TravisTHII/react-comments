import React, { createContext, useReducer } from 'react'
import axios from 'axios'

import GlobalReducer from './GlobalReducer'

import { GLOBAL } from './actions'

const initialState = {
	user: {},
	users: [],
	loading: false,
	fetched: false
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(GlobalReducer, initialState)

	const getUsers = async () => {
		try {

			dispatch({
				type: GLOBAL.LOADING
			})

			const { data: { users } } = await axios.get('/api/hmd/user')

			selectUser(users[2])

			dispatch({
				type: GLOBAL.GET_USERS,
				payload: {
					users
				}
			})

		} catch (error) {

		}
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
			getUsers,
			selectUser
		}}>
			{children}
		</GlobalContext.Provider>
	)
}