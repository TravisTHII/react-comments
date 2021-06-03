// @ts-nocheck
import { COMMENT, Action, State } from './types'

export const reducer = (state: State, action: Action): State => {
	const { type, payload } = action

	if (type === COMMENT.GET_REPLIES) {
		return {
			...state,
			fetched: true,
			loading: false,
			paging: payload.paging,
			results: payload.replies
		}
	}

	if (type === COMMENT.MORE_REPLIES) {
		return {
			...state,
			moreLoading: false,
			paging: payload.paging,
			results: state.results.concat(payload.replies)
		}
	}

	if (type === COMMENT.POST_REPLY) {
		return {
			...state,
			replyLoad: false,
			localReplies: true,
			results: [payload.reply, ...state.results]
		}
	}

	if (type === COMMENT.EDIT) {
		return {
			...state,
			editLoad: false,
			isEditing: false
		}
	}

	if (type === COMMENT.SHOW_MORE) {
		return {
			...state,
			showMore: payload.showMore
		}
	}

	if (type === COMMENT.OPEN_REPLY) {
		return {
			...state,
			isReplying: payload.isReplying
		}
	}

	if (type === COMMENT.SHOW_REPLIES) {
		return {
			...state,
			showReplies: payload.showReplies
		}
	}

	if (type === COMMENT.LOADING) {
		return {
			...state,
			loading: true
		}
	}

	if (type === COMMENT.REPLIES_LOADING) {
		return {
			...state,
			moreLoading: true
		}
	}

	if (type === COMMENT.REPLY_LOADING) {
		return {
			...state,
			replyLoad: true
		}
	}

	if (type === COMMENT.PIN_LOAD) {
		return {
			...state,
			pinLoad: payload.pinLoad
		}
	}

	if (type === COMMENT.START_EDITING) {
		return {
			...state,
			isEditing: payload.isEditing
		}
	}

	if (type === COMMENT.EDIT_LOAD) {
		return {
			...state,
			editLoad: true
		}
	}

	if (type === COMMENT.DELETE_LOAD) {
		return {
			...state,
			deleteLoad: payload.deleteLoad
		}
	}

	return state
}