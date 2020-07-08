import React from 'react';

const Header = ({ children }) => {
  return (
    <h2 className="header text-center col-6 offset-3 mt-5">
      { children }
    </h2>
  )
}

export default Header;