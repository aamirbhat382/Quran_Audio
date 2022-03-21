import React from "react";
import { Link } from "react-router-dom";
import logo from './logo.svg'

function Test() {
  return (
    <>
      <nav className="navbar navbar-expand-md  ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Quran Audio{" "}
          </Link>
          <a
            class="nav-link p-0"
            data-bs-toggle="offcanvas"
            href="/#offcanvasMenu"
            role="button"
            aria-controls="offcanvasMenu"
          >
            <i
              class="bi bi-text-right rtl-flip fs-2"
              data-bs-target="#offcanvasMenu"
            >
              {" "}
            </i>
          </a>
        </div>
      </nav>
      <div
        class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar offcanvas offcanvas-end-left"
        id="offcanvasMenu"
        style={{ visibility: "hidden" }}
      >
        <div class="offcanvas-header justify-content-end">
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
         <img src={logo} className="App-logo" alt="logo" />  
        </a>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/" class="nav-link active" aria-current="page">
              <svg class="bi me-2" width="16" height="16">
                <use href="/"></use>
              </svg>
              Home
            </a>
          </li>
          <li>
            <a href="/" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16">
                <use href="/"></use>
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16">
                <use href="/"></use>
              </svg>
              Orders
            </a>
          </li>
          <li>
            <a href="/" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16">
                <use href="/"></use>
              </svg>
              Products
            </a>
          </li>
          <li>
            <a href="/" class="nav-link link-dark">
              <svg class="bi me-2" width="16" height="16">
                <use href="/"></use>
              </svg>
              Customers
            </a>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <a
            href="/"
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul
            class="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser2"
          >
            <li>
              <a class="dropdown-item" href="/">
                New project...
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/">
                Settings
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/">
                Profile
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <a class="dropdown-item" href="/">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Test;
