import React, { createContext, useReducer } from 'react'
import GlobalReducer from './GlobalReducer'

import { GLOBAL } from './actions'

const initialState = {
	user: {
		username: 'Geralt',
		slug: 'geralt',
		motto: 'White Wolf',
		badge: {
			title: "Witcher",
			background_color: "#7d7d7d",
			text_color: ""
		},
		image: {
			avatar: "/images/users/geralt.jpg"
		}
	}
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({ children }) => {

	const [state, dispatch] = useReducer(GlobalReducer, initialState)


	return (
		<GlobalContext.Provider value={{
			state
		}}>
			{children}
		</GlobalContext.Provider>
	)
}