import React from 'react';
import {Link} from "react-router-dom";




function NavBar({children}) {
  return (
    <>
    <nav className="navbar navbar-expand-md  ">
        <div className="container-fluid">
            <Link className="navbar-brand" to="#">Quran Audio </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                   </li>
                   <li className="nav-item">
                        <Link className="nav-link" to="/suraha/tajweed">Tajweed</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/prayer">Prayer Times</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/clander">Calendar</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link className="nav-link " to="/about">About</Link>
                    </li>

                </ul>
                <ul className="navbar-nav flex-row flex-wrap ms-md-auto ">
                    <li className=" nav-item">
                        <a className="nav-link  " target="blank" href="https://github.com/aamirbhat382"><i className="bi bi-github me-1 "></i></a>
                     </li>
                    <li className=" nav-item">
                        <a className="nav-link " target="blank" href="https://www.facebook.com/aamirbhat382/"><i className="bi bi-facebook me-1 "></i></a>
                     </li>
                    <li className=" nav-item">
                        <a className="nav-link " target="blank" href="https://www.instagram.com/aamirbhat382/"><i className="bi bi-instagram me-1 "></i></a>
                     </li>
                    <li className=" nav-item">
                        <a className="nav-link " target="blank" href="https://twitter.com/aamirbhat382"><i className="bi bi-twitter me-1"></i></a>
                    </li>

                </ul>
                <form className="d-flex">
                    <a className="btn btn-outline-success" target="blank" href="https://github.com/aamirbhat382/Quran-audio-api"><i className="bi bi-github"></i> Source
                        Code</a>
                </form>
            </div>
        </div>
    </nav>
    <main>{children}</main>
    </>
  );
}

export default NavBar;