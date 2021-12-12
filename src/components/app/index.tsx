import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Header } from '../header'
import { Home } from '../home'
import { NotFound } from '../notfound'

import '../../style/index.css'

export const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
)
