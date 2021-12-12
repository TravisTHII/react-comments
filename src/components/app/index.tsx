import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Header } from '../header'
import { Home } from '../home'
import { NotFound } from '../notfound'

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
