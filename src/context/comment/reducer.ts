import { Action, State } from './types'

export const reducer = (state: State, action: Action): State => {
  if (action.type === 'GET_REPLIES') {
    return {
      ...state,
      fetched: true,
      loading: false,
      paging: action.payload.paging,
      results: action.payload.replies,
    }
  }

  if (action.type === 'MORE_REPLIES') {
    return {
      ...state,
      moreLoading: false,
      paging: action.payload.paging,
      results: state.results.concat(action.payload.replies),
    }
  }

  if (action.type === 'POST_REPLY') {
    return {
      ...state,
      replyLoad: false,
      localReplies: true,
      results: [action.payload.reply, ...state.results],
    }
  }

  if (action.type === 'EDIT') {
    return {
      ...state,
      editLoad: false,
      isEditing: false,
    }
  }

  if (action.type === 'SHOW_MORE') {
    return {
      ...state,
      showMore: action.payload.showMore,
    }
  }

  if (action.type === 'OPEN_REPLY') {
    return {
      ...state,
      isReplying: action.payload.isReplying,
    }
  }

  if (action.type === 'SHOW_REPLIES') {
    return {
      ...state,
      showReplies: action.payload.showReplies,
    }
  }

  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: true,
    }
  }

  if (action.type === 'REPLIES_LOADING') {
    return {
      ...state,
      moreLoading: true,
    }
  }

  if (action.type === 'REPLY_LOADING') {
    return {
      ...state,
      replyLoad: true,
    }
  }

  if (action.type === 'PIN_LOAD') {
    return {
      ...state,
      pinLoad: action.payload.pinLoad,
    }
  }

  if (action.type === 'START_EDITING') {
    return {
      ...state,
      isEditing: action.payload.isEditing,
    }
  }

  if (action.type === 'EDIT_LOAD') {
    return {
      ...state,
      editLoad: true,
    }
  }

  if (action.type === 'DELETE_LOAD') {
    return {
      ...state,
      deleteLoad: action.payload.deleteLoad,
    }
  }

  return state
}
