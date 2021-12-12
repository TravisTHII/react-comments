import React from 'react'

import { Props } from './types'

export const Badge = ({ badge }: Props) => (
  <span
    className="badge"
    style={{
      backgroundColor: `${badge.backgroundColor}`,
      color: `${badge.textColor}`,
    }}
  >
    {badge.title}
  </span>
)
