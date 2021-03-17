import { GLOBAL } from './actions'

export default (state, action) => {
	const { type, payload } = action

	if (type === GLOBAL.GET_THREADS_AND_USERS) {
		return {
			...state,
			loading: false,
			fetched: true,
			threads: payload.threads,
			users: payload.users,
		}
	}

	if (type === GLOBAL.SELECT_THREAD) {
		return {
			...state,
			thread: payload.thread
		}
	}

	if (type === GLOBAL.SELECT_USER) {
		return {
			...state,
			user: payload.user
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