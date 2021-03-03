import { COMMENT } from './actions'

export default (state, action) => {
	const { type, payload } = action

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

	return state
}