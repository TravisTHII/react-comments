import React, { createContext, useContext, useReducer } from 'react'
import axios from 'axios'

import { reducer } from './reducer'

import { THREAD, ProviderProps, State, InitialStateType, Pinned } from './types'

const { REACT_APP_API_URL } = process.env

const initialState: State = {
	total: 0,
	paging: {},
	comments: [],
	sort: 'newest',
	loading: false,
	sortLoad: false,
	moreLoad: false,
	postLoad: false,
	fetched: false,
	error: false,
	pinned: {} as Pinned,
	menu: {
		display: false,
		commentRef: null!,
		data: []
	}
}

export const Context = createContext({} as InitialStateType)

export const useThreadContext = () => useContext(Context)

export const Provider = ({ children, thread, token }: ProviderProps) => {

	const [state, dispatch] = useReducer(reducer, initialState)

	const getThread = async () => {
		try {

			dispatch({
				type: THREAD.LOAD_THREAD
			})

			const {
				data: {
					data: {
						total
					},
					paging,
					pinned,
					comments
				}
			} = await axios.get(
				`${REACT_APP_API_URL}/api/v1/thread/${thread}`,
				{ headers: { '_token': token } }
			)

			dispatch({
				type: THREAD.GET_THREAD,
				payload: {
					total,
					paging,
					pinned,
					comments
				}
			})

		} catch (error) {

			dispatch({
				type: THREAD.THREAD_ERROR
			})

		}
	}

	const sortThread = async (sort: string) => {
		try {

			if (!state.sortLoad) {

				dispatch({
					type: THREAD.LOAD_SORT
				})

				dispatch({ type: THREAD.SET_T_SORT, payload: { sort } })

				const {
					data: {
						paging,
						pinned,
						comments
					}
				} = await axios.get(
					`${REACT_APP_API_URL}/api/v1/thread/${thread}?sort=${sort}`,
					{ headers: { '_token': token } }
				)

				dispatch({
					type: THREAD.SORT_THREAD,
					payload: {
						paging,
						pinned,
						comments
					}
				})

			}

		} catch (error) {

			console.error(error)

		}
	}

	const loadMoreComments = async () => {
		try {

			if (!state.moreLoad) {

				dispatch({
					type: THREAD.LOAD_T_MORE
				})

				const {
					data: {
						paging,
						comments
					}
				} = await axios.get(
					`${REACT_APP_API_URL}/api/v1/thread/${thread}?cursor=${state.paging.cursor}&sort=${state.sort}`,
					{ headers: { '_token': token } }
				)

				dispatch({
					type: THREAD.MORE_THREAD,
					payload: {
						paging,
						comments
					}
				})

			}

		} catch (error) {

			console.error(error)

		}
	}

	const postComment = async (body: string, user: string) => {
		try {

			if (!state.postLoad) {

				dispatch({
					type: THREAD.TP_LOAD
				})

				const {
					data:
					{
						comment
					}
				} = await axios.post(
					`${REACT_APP_API_URL}/api/v1/thread/comment`,
					{ thread, user, body },
					{ headers: { '_token': token } }
				)

				dispatch({
					type: THREAD.POST_COMMENT,
					payload: {
						comment
					}
				})

			}

		} catch (error) {

			console.error(error)

		}
	}

	const getPinnedComment = async () => {
		try {

			if (!state.pinned.loading) {

				dispatch({
					type: THREAD.PIN_LOADING
				})

				const {
					data: {
						comment
					}
				} = await axios.post(
					`${REACT_APP_API_URL}/api/v1/thread/${thread}/pin`,
					{},
					{ headers: { '_token': token } }
				)

				dispatch({
					type: THREAD.PIN_COMMENT,
					payload: {
						comment
					}
				})

			}

		} catch (error) {

		}
	}

	const getMenu = (ref: HTMLDivElement | null, menu: string[]) => {
		if (state.menu.commentRef !== ref) {

			destroyMenu()

			dispatch({
				type: THREAD.GET_MENU,
				payload: {
					display: true,
					commentRef: ref,
					data: menu
				}
			})

		} else {

			destroyMenu()

		}
	}

	const destroyMenu = () => {
		dispatch({
			type: THREAD.GET_MENU,
			payload: {
				display: false,
				commentRef: null!,
				data: []
			}
		})
	}

	const updatePinnedComment = (_id: string, type: string) => {
		switch (type) {
			case 'Pin':
				dispatch({
					type: THREAD.UPDATE_PIN,
					payload: {
						pinned_id: _id,
						useLocalPinned: true
					}
				})
				break;
			case 'Unpin':
				dispatch({
					type: THREAD.UPDATE_PIN,
					payload: {
						pinned_id: "",
						hasPinned: false,
						useInitialPinned: false,
						comment: {}
					}
				})
				break;
			default:
				break;
		}
	}

	return (
		<Context.Provider value={{
			...state,
			thread,
			getThread,
			sortThread,
			postComment,
			loadMoreComments,
			getMenu,
			destroyMenu,
			getPinnedComment,
			updatePinnedComment
		}}>
			{children}
		</Context.Provider>
	)
}