import React from 'react';
import { Link } from "react-router-dom";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <nav className='navigationContainer'>
        <ul>
          <li>
            <Link to="/" className='navLink'>Dry Goods Live</Link>
          </li>
          <li>
            <Link to="/perishables/live" className='navLink'>Perishables Live</Link>
          </li>
        </ul>
    </nav>
  )
}

export default Navigation