import React from 'react'
import { FaCode, FaGithub } from 'react-icons/fa'

import Logo from '../../svg/react.svg'

export const Header = () =>
  <header id="header">
    <div className="header_container">
      <div className="header_logo text-ui">
        <div className="react_comments_logo flex_ui">
          <img src={Logo} alt="" />
        </div>
        <h1>React Comments</h1>
      </div>
      <div className="icons_container">
        <a
          className="icon flex_ui"
          href="https://github.com/TravisTHII"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          className="icon flex_ui"
          href="https://github.com/TravisTHII/comments"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode />
        </a>
      </div>
    </div>
  </header>