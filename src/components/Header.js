import React from 'react'
import { FaCode, FaGithub } from 'react-icons/fa'

export function Header() {
  return (
    <header id="header">
      <div className="header_container">
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
  )
}