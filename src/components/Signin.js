import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';
import tourismImage from "../images/loginBackground.jpg";
import '../styles/Form.css';

export default function Signin(props) {

  const { isLoggedIn, setisLoggedIn, isAdmin, setisAdmin } = useContext(GlobalContext);

  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "", password: ""
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        username, password
      })
    });
    console.log("status ", res.status);

    const data = await res.json();
    console.log("Directly printing token value");
    console.log(data);

    localStorage.setItem("token", data.token);

    if (res.status === 401) {
      window.alert("Incorrect username or password");
      navigate('/signin');
    }
    else if (res.status === 200) {
      setisLoggedIn(true);
      window.alert("Login Successful!");
      navigate('/Home');
    }
    else if (res.status === 201) {
      window.alert("Admin login Successful!");
      setisAdmin(true);
      localStorage.setItem('isAdmin', true);
      setisLoggedIn(true);
      navigate('/adminhome');
    }
  }

  return (
    <>
    {isLoggedIn}
    {isAdmin}
     <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${tourismImage})`, backgroundPosition: "center", backgroundSize: 'cover' }}>
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: 'white' }}>

          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

          <form method="post" className="mx-1 mx-md-4">

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="text" id="username" className="form-control" name="username" value={user.username} onChange={handleInputs} />
                <label className="form-label" htmlFor="username">Your Username</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="password" id="password" className="form-control" name="password" value={user.password} onChange={handleInputs} />
                <label className="form-label" htmlFor="password">Password</label>
              </div>
            </div>



            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type="button" className="btn btn-clr btn-primary btn-lg" onClick={PostData}>Login</button>
            </div>

          </form>

        </div>

      </div>


    </>
  )
}
