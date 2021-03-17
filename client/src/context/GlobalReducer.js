import { GLOBAL } from './actions'

export default (state, action) => {
	const { type, payload } = action

	if (type === GLOBAL.GET_USERS) {
		return {
			...state,
			loading: false,
			fetched: true,
			users: payload.users
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