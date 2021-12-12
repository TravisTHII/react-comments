import React from 'react'

import { GlobalProvider } from '../../context/global'

import { Home } from './Home'

export const HomeProvider = () => (
  <GlobalProvider>
    <Home />
  </GlobalProvider>
)
