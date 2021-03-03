import { THREAD } from './actions'

export default (state, action) => {
	const { type, payload } = action

	if (type === THREAD.GET_THREAD) {
		return {
			...state,
			loading: false,
			...payload
		}
	}

	if (type === THREAD.LOAD_THREAD) {
		return {
			...state,
			loading: true
		}
	}

	return state
}