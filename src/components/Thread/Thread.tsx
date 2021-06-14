import React, { useEffect } from 'react'

import { useGlobalContext } from '../../context/Global'
import { useThreadContext } from '../../context/Thread'

import { Header, Poster, Pinned } from './'
import { Comment } from '../Comment'
import { Spinner } from '../Includes/Spinner'

export function Thread() {

  const { user, thread, userLoading } = useGlobalContext()

  const {
    loading,
    error,
    fetched,
    sortLoad,
    postLoad,
    comments,
    paging,
    moreLoad,
    getThread,
    loadMoreComments
  } = useThreadContext()

  useEffect(() => {
    getThread()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, thread])

  let content
    , sorted

  const Loading =
    <Spinner style={{ display: 'block', margin: '0 auto', paddingTop: '50px' }} />

  if (loading || userLoading) {

    content = Loading

  } else if (error) {

    content =
      <div className='sitc'>
        <h3 className='text-ui fwn'>An error occurred while retrieving this thread...</h3>
      </div>

  } else if (fetched) {

    if (sortLoad) {

      sorted = Loading

    } else {

      sorted =
        <div className="thread">
          <div className="thread_comments">

            <Pinned />

            {postLoad &&
              <Spinner stroke="#fff" style={{ display: 'block', margin: '10px auto' }} />
            }

            {!comments.length &&
              <div className='sitc'>
                <h3 className='text-ui fwn'>There are no comments, be the first.</h3>
              </div>
            }

            {comments.map(c => (
              <Comment
                key={`${c.react.key}`}
                comment={c}
              />
            ))}

          </div>

          {!paging.end &&
            <div className="load_comments">
              <button
                type="button"
                className={`enspr_red_btn${moreLoad ? ' disabled' : ''}`}
                disabled={moreLoad ? true : false}
                onClick={() => loadMoreComments()}
              >
                {!moreLoad
                  ? 'see more comments'
                  : <Spinner stroke="#fff" style={{ display: 'block', margin: '0 auto', width: '30px', height: '30px' }} />
                }
              </button>
            </div>
          }

        </div>

    }

    content =
      <>
        <Header />
        <Poster />
        {sorted}
      </>

  }

  return (
    <div className="thread_column">
      {content}
    </div>
  )
}