import React from 'react'

import { GlobalProvider } from 'context/Global'

import { Home } from './Home'

export const HomeProvider = () =>
  <GlobalProvider>
    <Home />
  </GlobalProvider>