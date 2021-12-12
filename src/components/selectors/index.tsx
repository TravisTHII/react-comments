import React from 'react'

import { SelectUser } from './user'
import { SelectThread } from './thread'

export const Selectors = () => (
  <div className="thread_selectors">
    <SelectUser />
    <SelectThread />
  </div>
)
