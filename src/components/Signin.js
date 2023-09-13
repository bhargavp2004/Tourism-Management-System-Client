import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username : "", password : ""
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value});
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

    const data = res.json();

    if (res.status === 401) {
      window.alert("Incorrect username or password");
      navigate('/signin');
    }
    else if(res.status === 200) {
      window.alert("Login Successful!");
      navigate('/Home');
    }
    else if(res.status === 201){
      window.alert("Admin login Successful!");
      navigate('/adminhome');
    }
  }

  return (
    <>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

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
                          <button type="button" className="btn btn-primary btn-lg" onClick={PostData}>Login</button>
                        </div>

                      </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
