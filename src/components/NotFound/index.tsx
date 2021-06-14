import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound = () =>
  <div id="not-found" className="text-ui">
    <h1>404 Page Not Found...</h1>
    <p>The page you are looking for does not exist, <Link to="/" className="red_link">Go Home</Link></p>
  </div>