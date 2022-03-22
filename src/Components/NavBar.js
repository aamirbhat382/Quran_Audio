
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
            {currentPathName}
          </Link>
        </div>
      </nav>
      {/* NavBar End */}
      {/* Sidebar */}
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar offcanvas offcanvas-end-left"
        id="offcanvasMenu" tabindex="-1" aria-modal="true"  role="dialog" data-bs-dismiss="offcanvas">
        <div className="offcanvas-header justify-content-end">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
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
            <NavLink to="/" className="nav-link "  activeClassName="active" aria-current="page">
            <i class="bi bi-house me-2"></i>
              Home
            </NavLink>
          </li>
          <li>
          <NavLink to="/suraha/tajweed" className="nav-link "  activeClassName="active" aria-current="page">
          <i class="bi bi-book me-2"></i>
              Tajweed
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/prayer" className="nav-link "  activeClassName="active" aria-current="page">
            <i class="bi bi-clock me-2"></i>
              Prayer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/clander" className="nav-link "  activeClassName="active" aria-current="page">
            <i class="bi bi-calendar-day me-2"></i>
              Calendar
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link " data-bs-dismiss="offcanvas" activeClassName="active" aria-current="page">
            <i class="bi bi-file-earmark-person me-2"></i>
              About
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="/"
            className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Aamir Hussain</strong>
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <a className="dropdown-item" href="/">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
  
    <main>{children}</main>
    </>
  );
}

export default NavBar;