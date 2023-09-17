import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { NavLink } from 'react-router-dom';
import LogoutButton from './Logout';
import { GlobalContext } from '../App';

export default function Navbar(props) {

  const { isLoggedIn, setisLoggedIn } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/about");
        if (response.status === 200) {
          const result = await response.json();
          console.log(result);
          setisLoggedIn(true);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);


  // Assuming props.isAdmin is set to true when the user is an admin

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/Home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              {!isLoggedIn && 
              <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                Login
              </NavLink>
            </li>}

            {!isLoggedIn && 
              <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Register
              </NavLink>
            </li>}
              
              
              {isLoggedIn && <LogoutButton loginfo={setisLoggedIn}/>}
              {/* Conditional rendering for admin */}
              {props.isAdmin && (
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
              {/* End of Conditional rendering for admin */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
