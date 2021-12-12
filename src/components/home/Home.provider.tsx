import React from 'react'

import { GlobalProvider } from '../../context'

import { Home } from './Home'

export const HomeProvider = () => (
  <GlobalProvider>
    <Home />
  </GlobalProvider>
)
