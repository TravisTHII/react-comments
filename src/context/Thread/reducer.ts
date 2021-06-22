import { State, Action } from './types'

export const reducer = (state: State, action: Action): State => {

  if (action.type === 'GET_THREAD') {
    return {
      ...state,
      loading: false,
      fetched: true,
      total: action.payload.total,
      paging: action.payload.paging,
      pinned: {
        ...state.pinned,
        comment: action.payload.pinned
      },
      comments: action.payload.comments
    }
  }

  if (action.type === 'SORT_THREAD') {
    return {
      ...state,
      sortLoad: false,
      paging: action.payload.paging,
      pinned: {
        ...state.pinned,
        comment: action.payload.pinned
      },
      comments: action.payload.comments
    }
  }

  if (action.type === 'MORE_THREAD') {
    return {
      ...state,
      moreLoad: false,
      paging: action.payload.paging,
      comments: state.comments.concat(action.payload.comments)
    }
  }

  if (action.type === 'POST_COMMENT') {
    return {
      ...state,
      postLoad: false,
      comments: [action.payload.comment, ...state.comments]
    }
  }

  if (action.type === 'PIN_COMMENT') {
    return {
      ...state,
      pinned: {
        ...state.pinned,
        comment: action.payload.comment,
        loading: false
      }
    }
  }

  if (action.type === 'UPDATE_PIN') {
    return {
      ...state,
      pinned: {
        ...state.pinned,
        ...action.payload
      }
    }
  }

  if (action.type === 'GET_MENU') {
    return {
      ...state,
      menu: {
        display: action.payload.display,
        commentRef: action.payload.commentRef,
        data: action.payload.data
      }
    }
  }

  if (action.type === 'SET_T_SORT') {
    return {
      ...state,
      sort: action.payload.sort
    }
  }

  if (action.type === 'LOAD_THREAD') {
    return {
      ...state,
      loading: true
    }
  }

  if (action.type === 'LOAD_SORT') {
    return {
      ...state,
      sortLoad: true
    }
  }

  if (action.type === 'LOAD_T_MORE') {
    return {
      ...state,
      moreLoad: true
    }
  }

  if (action.type === 'TP_LOAD') {
    return {
      ...state,
      postLoad: true
    }
  }

  if (action.type === 'PIN_LOADING') {
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

  if (action.type === 'THREAD_ERROR') {
    return {
      ...state,
      loading: false,
      error: true
    }
  }

  return state
}