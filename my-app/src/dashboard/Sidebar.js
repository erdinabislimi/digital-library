import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../features/footer/logo.png';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h3>MyLibrary</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/home">
            MY-LIBRARY
            <img 
              src={logo} 
              alt="MyLibrary Logo" 
              style={{ width: '60px', marginLeft: '10px' }} 
            />
          </Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/librat">Librat</Link>
        </li>
        <li>
          <Link to="/kategorite">Kategoritë</Link>
        </li>
        <li>
          <Link to="/autoret">Autorët</Link>
        </li>
        <li>
          <Link to="/lexuesit">Lexuesit</Link>
        </li>
        <li>
          <Link to="/huazimet">Huazimet</Link>
        </li>
        <li>
          <Link to="/rezervimet">Rezervimet</Link>
        </li>
      
        
      </ul>
    </aside>
  );
};

export default Sidebar;
