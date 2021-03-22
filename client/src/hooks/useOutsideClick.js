import { useEffect, useRef } from 'react'

const useOutsideClick = (handler, type, dependency) => {
	const domRef = useRef()

	useEffect(() => {
		const clickRef = domRef.current

		const outsideClick = (e) => {
			if (type === 'outside') {
				if (!clickRef.contains(e.target)) {
					handler()
				}
			}

			if (type === 'custom') {
				handler(e)
			}
		}

		document.addEventListener('click', outsideClick)

		return () => document.removeEventListener('click', outsideClick)
	}, [dependency, handler, type])

	return domRef
}

export default useOutsideClick