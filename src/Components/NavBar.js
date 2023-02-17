
import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo.svg";



function NavBar({children}) {
    const currentPathName = window.location.pathname.slice(1);
  return (
    <>
      {/* NavBar Start */}
      <nav className="navbar navbar-expand-md  ">
        <div className="container-fluid">
          <a
            className="nav-link p-0"
            data-bs-toggle="offcanvas"
            href="/#offcanvasMenu"
            role="button"
            aria-controls="offcanvasMenu"
          >
            <i
              className="bi bi-text-left rtl-flip fs-2"
              data-bs-target="#offcanvasMenu"
            >
              {" "}
            </i>
          </a>
          <Link className="navbar-brand text-capitalize" to="#">
            Quran Audio
          </Link>
        </div>
      </nav>
      {/* NavBar End */}
      {/* Sidebar */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 background-dark sidebar offcanvas offcanvas-end-left"
        id="offcanvasMenu" tabIndex="-1" aria-modal="true"  role="dialog" data-bs-dismiss="offcanvas">
        <div className="offcanvas-header justify-content-end">
        <i type="button" className=" btn-close-sidebar text-reset bi bi-x-lg" data-bs-dismiss="offcanvas" aria-label="Close"></i>
         
        </div>
        <a
          href="/"
          className="d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link "  activeclassname="active" aria-current="page">
            <i className="bi bi-house me-2"></i>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/surha-audio" className="nav-link "  activeclassname="active" aria-current="page">
            <i className="bi bi-music-note-beamed me-2"></i>
              Audio
            </NavLink>
          </li>
          <li>
          <NavLink to="/suraha/tajweed" className="nav-link "  activeclassname="active" aria-current="page">
          <i className="bi bi-book me-2"></i>
              Tajweed
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/prayer" className="nav-link "  activeclassname="active" aria-current="page">
            <i className="bi bi-clock me-2"></i>
              Prayer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/clander" className="nav-link "  activeclassname="active" aria-current="page">
            <i className="bi bi-calendar-day me-2"></i>
              Calendar
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/settings" className="nav-link "  activeclassname="active" aria-current="page">
            <i className="bi bi-gear me-2"></i>
              Settings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/downloadapp" className="nav-link " activeclassname="active" aria-current="page">
            <i className="bi bi-arrow-down-circle me-2"></i>
              Download App
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/developer" className="nav-link " activeclassname="active" aria-current="page">
            <i className="bi bi-file-code me-2"></i>
              Developer
            </NavLink>
          </li>
        </ul>
        <hr />
        <a className="text-light" href="https://github.com/aamirbhat382/Quran_Audio" target='_blank'>GitHub</a>
      </div>
  
    <main>{children}</main>
    </>
  );
}

export default NavBar;