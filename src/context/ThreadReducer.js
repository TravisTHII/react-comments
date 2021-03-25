import { THREAD } from './actions'

export const ThreadReducer = (state, action) => {
	const { type, payload } = action

	if (type === THREAD.GET_THREAD) {
		return {
			...state,
			loading: false,
			fetched: true,
			total: payload.total,
			paging: payload.paging,
			pinned: {
				...payload.pinned
			},
			comments: payload.comments
		}
	}

	if (type === THREAD.SORT_THREAD) {
		return {
			...state,
			sortLoad: false,
			paging: payload.paging,
			pinned: {
				...payload.pinned
			},
			comments: payload.comments
		}
	}

	if (type === THREAD.MORE_THREAD) {
		return {
			...state,
			moreLoad: false,
			paging: payload.paging,
			comments: state.comments.concat(payload.comments)
		}
	}

	if (type === THREAD.POST_COMMENT) {
		return {
			...state,
			postLoad: false,
			comments: [payload.comment, ...state.comments]
		}
	}

	if (type === THREAD.PIN_COMMENT) {
		return {
			...state,
			pinned: {
				...state.pinned,
				comment: payload.comment,
				loading: false
			}
		}
	}

	if (type === THREAD.UPDATE_PIN) {
		return {
			...state,
			pinned: {
				...state.pinned,
				...payload
			}
		}
	}

	if (type === THREAD.GET_MENU) {
		return {
			...state,
			menu: {
				display: true,
				commentRef: payload.commentRef,
				data: payload.menu
			}
		}
	}

	if (type === THREAD.DESTROY_MENU) {
		return {
			...state,
			menu: {
				display: false,
				commentRef: null,
				data: []
			}
		}
	}

	if (type === THREAD.SET_T_SORT) {
		return {
			...state,
			sort: payload.sort
		}
	}

	if (type === THREAD.LOAD_THREAD) {
		return {
			...state,
			loading: true
		}
	}

	if (type === THREAD.LOAD_SORT) {
		return {
			...state,
			sortLoad: true
		}
	}

	if (type === THREAD.LOAD_T_MORE) {
		return {
			...state,
			moreLoad: true
		}
	}

	if (type === THREAD.TP_LOAD) {
		return {
			...state,
			postLoad: true
		}
	}

	if (type === THREAD.PIN_LOADING) {
		return {
			...state,
			pinned: {
				...state.pinned,
				loading: true,
				hasPinned: true,
				useInitialPinned: false
			}
		}
	}

	if (type === THREAD.RESET_THREAD) {
		return {
			...payload
		}
	}

	if (type === THREAD.THREAD_ERROR) {
		return {
			...state,
			loading: false,
			error: true
		}
	}

	return state
}