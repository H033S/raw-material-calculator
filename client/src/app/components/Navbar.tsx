"use client";

import { useEffect } from 'react';
import UserProfileComponent from './UserProfileComponent';

const Navbar = () => {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand me-2" href="#">Navbar</a>
        <div className="d-flex flex-grow-1 align-items-center">
          <button 
            className="navbar-toggler border-0 me-3" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNavDropdown" 
            aria-controls="navbarNavDropdown" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Raw Materials
                </a>
              </li>
            </ul>
          </div>
          <div className="ms-auto">
            <UserProfileComponent />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 