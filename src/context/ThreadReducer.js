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

	if (type === THREAD.POST_COMMENT) {
		return {
			...state,
			postLoad: false,
			comments: [payload.comment, ...state.comments]
		}
	}

	if (type === THREAD.LOAD_THREAD) {
		return {
			...state,
			loading: true
		}
	}

	if (type === THREAD.TP_LOAD) {
		return {
			...state,
			postLoad: true
		}
	}

	return state
}