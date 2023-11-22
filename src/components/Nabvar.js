import { Link, useLocation } from "react-router-dom";
import React from "react";

const Nabvar = (props) => {
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.showAlert("loged out Successfully", "success");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
              {!localStorage.getItem("token") ?
            <form className="d-flex" role="search">
            <Link className="btn btn-outline-success mx-2" to="/login" role="button">LogIn</Link>
            <Link className="btn btn-outline-success mx-2" to="/signup" role="button">SignUp</Link>
            </form>
            :
            <Link onClick={handleLogout} className="btn btn-outline-primary mx-2" to="/login" role="button">Log out</Link>
             }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nabvar;
