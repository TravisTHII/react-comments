import React from 'react'
import { Shimmer } from './Shimmer'

export function ThreadSkeleton() {
	return (
		<div className="thread_column_skeleton">
			<div className="thread_header_skeleton">
				<div className="thread_header_item_skeleton has_shimmer">
					<Shimmer />
				</div>
				<div className="thread_header_item_skeleton has_shimmer">
					<Shimmer />
				</div>
			</div>

			<div className="thread_sitc_skeleton has_shimmer">
				<Shimmer />
			</div>

			<div className="thread_comment_skeleton">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a, _) => (
					<div
						key={a}
						className="comment_skeleton has_shimmer"
					>
						<div className="comment_picture_skeleton"></div>
						<div className="comment_info_skeleton">
							<div className="paragraph_skeleton"></div>
							<div className="paragraph_skeleton"></div>
							<div className="paragraph_skeleton"></div>
						</div>
						<Shimmer />
					</div>
				))}
			</div>
		</div>
	)
}