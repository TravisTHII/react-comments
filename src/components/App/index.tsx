import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from '../../components/Header'
import { Home } from '../../components/Home'
import { NotFound } from '../../components/NotFound'

import '../../style/App.css'

export const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
