import React from 'react'

export const Header = () => {
  return (
    <>
    <header className="header-details header">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className=" row">
                <div className="col-sm-6">
                  <span className="header-email col-xs-6"><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;
                    <a href="mailto:info@language-interpreters.com">info@language-interpreters.com</a>
                  </span>
                </div>
                <div className="col-sm-6">
                  <span className="header-phone">
                    <i className="fa fa-phone-square" aria-hidden="true"></i>&nbsp;
                    <a href="tel:0208 123 5556">0208 123 5556</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
