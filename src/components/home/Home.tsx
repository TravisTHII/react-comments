import React, { useEffect } from 'react'

import { useGlobalContext, ThreadProvider } from '../../context'

import { Selectors } from '../selectors'
import { Thread } from '../thread'

import { SkeletonLoader } from '../skeletons'

export function Home() {
  const { thread, token, loading, fetched, getSelectors } = useGlobalContext()

  useEffect(() => {
    getSelectors()
  }, [getSelectors])

  window.onbeforeunload = () => {
    window.scrollTo(0, 0)
  }

  let content

  if (loading) {
    content = <SkeletonLoader />
  } else if (fetched) {
    content = (
      <>
        <Selectors />
        <ThreadProvider thread={thread} token={token}>
          <Thread />
        </ThreadProvider>
      </>
    )
  }

  return <div id="ReactComments">{content}</div>
}
