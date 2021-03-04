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

	if (type === THREAD.MORE_THREAD) {

		const comments = state.comments.concat(payload.comments)
			, cursor = comments.lastIndexOf(comments[comments.length - 1])

		return {
			...state,
			moreLoad: false,
			paging: {
				...state.paging,
				cursor,
				end: comments.length === state.paging.total
			},
			comments
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

	if (type === THREAD.LOAD_T_MORE) {
		return {
			...state,
			moreLoad: true
		}
	}

	return state
}