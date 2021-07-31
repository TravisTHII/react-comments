import React from 'react'

import { Shimmer } from './Shimmer'

export const SelectorSkeleton = () => (
  <div className="selectors_skeleton">
    <div className="select_user_skeleton">
      <div className="select_user_header_skeleton has_shimmer">
        <Shimmer />
      </div>
      <div className="select_user_users_skeleton">
        {[1, 2, 3, 4, 5].map((a, _) => (
          <div key={a} className="select_user_square_skeleton has_shimmer">
            <Shimmer />
          </div>
        ))}
      </div>
    </div>
    <div className="select_thread_skeleton">
      <div className="select_thread_header_skeleton has_shimmer">
        <Shimmer />
      </div>
      <div className="select_thread_threads_skeleton">
        {[1, 2, 3].map((a, _) => (
          <div
            key={a}
            className="select_thread_item_skeleton flex_ui has_shimmer"
          >
            <Shimmer />
          </div>
        ))}
      </div>
    </div>
  </div>
)
