import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h2>MyLibrary</h2>
      </div>
      <div className="header-right">
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Log out</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
