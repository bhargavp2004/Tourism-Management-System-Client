import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import tourismImage from "../images/backgroundImg.jpg";
import { GlobalContext } from "../App";
import '../styles/Form.css';

export default function Signup() {
  const { isLoggedIn, setisLoggedIn, isAdmin, setisAdmin } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    mobilenumber: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    console.log("Post Data called");

    const {
      firstname,
      lastname,
      email,
      username,
      password,
      repeatPassword,
      mobilenumber,
    } = user;
    console.log(firstname);

    if (
      !email ||
      !username ||
      !password ||
      !repeatPassword ||
      !firstname ||
      !lastname
    ) {
      console.log("fill all the fields properly");
      window.alert("Fill all the fields properly");
      navigate("/signup");
    } else {
      if (password !== repeatPassword) {
        window.alert("Password and Repeat password field must match");
        navigate("/");
      } else {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            username,
            password,
            mobilenumber,
          }),
        });

        const data = await res.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        if (res.status === 400) {
          window.alert("Try with different username and email");
          navigate("/");
        } else if (res.status === 401) {
          window.alert("Found error");
        } else {
          window.alert("Registration Successful");
          setisLoggedIn(true);
          navigate("/Home");
        }
      }
    }
  };

  return (
    <>
      {isLoggedIn && navigate('/Home')}
      <div className="d-flex justify-content-center"  style={{backgroundImage: `url(${tourismImage})`, backgroundAttachment:"fixed", position:"sticky", backgroundPosition : "center", backgroundSize : 'cover', zIndex: -1}}>
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: 'white' }}>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Sign up
          </p>

          <form method="post" className="mx-1 mx-md-4" style={{ zIndex: 1 }}>
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="firstname">
                  First Name
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="lastname">
                  Last Name
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="email">
                  Your Email
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="username">
                  Your Username
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="password"
                  id="repeatPassword"
                  className="form-control"
                  name="repeatPassword"
                  value={user.repeatPassword}
                  onChange={handleInputs}
                />
                <label
                  className="form-label"
                  htmlFor="repeatPassword"
                >
                  Repeat Password
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="mobilenumber"
                  className="form-control"
                  name="mobilenumber"
                  value={user.mobilenumber}
                  onChange={handleInputs}
                  maxLength={10}
                />
                <label
                  className="form-label"
                  htmlFor="mobilenumber"
                >
                  Mobile Number
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                style={{ color: 'white' }}
                onClick={PostData}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>


    </>
  );
}