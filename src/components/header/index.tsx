import React from 'react'
import { IconContext } from 'react-icons'
import { FaCode, FaGithub } from 'react-icons/fa'

import Logo from '../../svg/react.svg'

export const Header = () => (
  <header id="header">
    <div className="header_container">
      <div className="header_logo text-ui">
        <div className="react_comments_logo flex_ui">
          <img src={Logo} alt="react-comments" />
        </div>
        <h1>React Comments</h1>
      </div>
      <div className="icons_container">
        <IconContext.Provider value={{ size: '1.5rem', color: '#fff' }}>
          <a
            className="icon flex_ui"
            href="https://github.com/TravisTHII/react-comments"
            target="_blank"
            rel="noopener noreferrer"
            title="Project Code"
          >
            <FaCode />
          </a>
          <a
            className="icon flex_ui"
            href="https://github.com/TravisTHII"
            target="_blank"
            rel="noopener noreferrer"
            title="My GitHub"
          >
            <FaGithub />
          </a>
        </IconContext.Provider>
      </div>
    </div>
  </header>
)
