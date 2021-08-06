import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const SkeletonLoader = () => (
  <SkeletonTheme color="#202020" highlightColor="#444">
    <div className="selectors_skeleton">
      <div className="select_user_skeleton">
        <div>
          <Skeleton className="select_user_header_skeleton" />
        </div>
        <div className="select_user_users_skeleton">
          <Skeleton count={5} className="select_user_square_skeleton" />
        </div>
      </div>

      <div className="select_thread_skeleton">
        <div>
          <Skeleton className="select_thread_header_skeleton" />
        </div>
        <div className="select_thread_threads_skeleton">
          <Skeleton count={3} className="select_thread_item_skeleton" />
        </div>
      </div>
    </div>

    <div className="thread_column_skeleton">
      <div className="thread_header_skeleton">
        <Skeleton className="thread_header_item_skeleton" />
        <Skeleton className="thread_header_item_skeleton" />
      </div>

      <div>
        <Skeleton className="thread_sitc_skeleton" />
      </div>

      <div className="thread_comment_skeleton">
        <Skeleton count={9} className="comment_skeleton" />
      </div>
    </div>
  </SkeletonTheme>
)
