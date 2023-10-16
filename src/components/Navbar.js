import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink } from "react-router-dom";
import LogoutButton from "./Logout";
import { GlobalContext } from "../App";
import "../styles/Navbar.css";

export default function Navbar(props) {
  const { isLoggedIn, setisLoggedIn, isAdmin, setisAdmin } =
    useContext(GlobalContext);

    useEffect(() => {
      // Manually initialize Bootstrap's collapse functionality
      const toggler = document.querySelector(".navbar-toggler");
      const target = document.querySelector("#navbarSupportedContent");
  
      toggler.addEventListener("click", () => {
        target.classList.toggle("show");
      });
  
      // Clean up event listener when component unmounts
      return () => {
        toggler.removeEventListener("click", () => {
          target.classList.toggle("show");
        });
      };
    }, []); // Empty dependency array ensures effect runs once after initial render

    
    
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
        <div className="container-fluid">
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
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/Home">
                  Home
                </NavLink>
              </li>
              
              {!isLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    Login
                  </NavLink>
                </li>
              )}

              {!isLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Register
                  </NavLink>
                </li>
              )}

              {!isAdmin && isLoggedIn && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              )}

              {/* Conditional rendering for admin */}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/adminhome">
                      Admin Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/addpack">
                      Add Package
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/addguide">
                      Add Guide
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/addplace">
                      Add Place
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/updatepack">
                      Update Package
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/updateguide">
                      Update Guide
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/updateplace">
                      Update Place
                    </NavLink>
                  </li>
                </>
              )}

              {isLoggedIn && <LogoutButton loginfo={setisLoggedIn} />}
              {/* End of Conditional rendering for admin */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}