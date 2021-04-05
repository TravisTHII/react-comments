import { GLOBAL } from './actions'

export const GlobalReducer = (state, action) => {
	const { type, payload } = action

	if (type === GLOBAL.SELECTORS) {
		return {
			...state,
			loading: false,
			fetched: true,
			threads: payload.threads,
			users: payload.users
		}
	}

	if (type === GLOBAL.SELECT_THREAD) {
		return {
			...state,
			thread: payload.thread
		}
	}

	if (type === GLOBAL.AUTH) {
		return {
			...state,
			loading: false,
			userLoading: false,
			loggedIn: payload.loggedIn,
			token: payload.token,
			user: payload.user
		}
	}

	if (type === GLOBAL.CHANGE_USER) {
		return {
			...state,
			userLoading: true
		}
	}

	if (type === GLOBAL.LOADING) {
		return {
			...state,
			loading: true
		}
	}

	return state
}