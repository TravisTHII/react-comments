import React, { useEffect } from 'react'

import { useGlobalContext } from '../../context/Global'
import { ThreadProvider } from '../../context/Thread'

import { Selectors } from '../../components/Selectors'
import { Thread } from '../Thread'

import { SkeletonLoader } from '../Skeletons'

export function Home() {

  const { thread, token, loading, fetched, getSelectors } = useGlobalContext()

  useEffect(() => {
    getSelectors()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  window.onbeforeunload = () => { window.scrollTo(0, 0) }

  let content

  if (loading) {

    content =
      <SkeletonLoader />

  } else if (fetched) {

    content =
      <>
        <Selectors />
        <ThreadProvider thread={thread} token={token}>
          <Thread />
        </ThreadProvider>
      </>

  }

  return (
    <div id="ReactComments">
      {content}
    </div>
  )
}