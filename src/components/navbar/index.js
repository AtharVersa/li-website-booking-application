import React from 'react'
import './Navbar.css';

export const Navbar = () => {
  return (
    <>
    <div className="w3l-bootstrap-header sticky-top header">
        <nav className="navbar navbar-expand-lg navbar-light py-0">
          <div className="container">
            <a className="navbar-brand" href="http://language-interpreters.com/">
              <img src="https://language-interpreters.com/wp-content/uploads/2021/07/logo-2.png" alt="ltLogo" title="Language Interpreters | No Language Barrier Ever"
                className="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
