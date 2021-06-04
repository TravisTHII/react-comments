import { useEffect, useRef } from 'react'

export const useOutsideClick = (
  handler: (e: React.MouseEvent<HTMLDivElement>) => void
) => {
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const outsideClick: any = (e: React.MouseEvent<HTMLDivElement>) => {
      handler(e)
    }

    document.addEventListener('click', outsideClick)

    return () => document.removeEventListener('click', outsideClick)
  }, [handler])

  return domRef
}