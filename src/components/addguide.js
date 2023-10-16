import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tourismImage from '../images/pic3.jpg';

export default function Signup() {
  const navigate = useNavigate();
  const [guide, setGuide] = useState({
    firstname: "", lastname: "", email: "", username: "", password: "", repeatPassword: "", mobilenumber: ""
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setGuide({ ...guide, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    console.log("Post Data called")

    const { firstname, lastname, email, username, password, repeatPassword, mobilenumber } = guide;
    console.log(firstname);

    if (!email || !username || !password || !repeatPassword || !firstname || !lastname || !mobilenumber) {
      console.log("fill all the fields properly");
      window.alert('Fill all the fields properly')
      navigate('/addguide');
    }
    else if (password !== repeatPassword) {

      window.alert('Password and Repeat password field must match');
      navigate('/addguide');

    }
    else {
      const res = await fetch("http://localhost:5000/addGuide", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          firstname, lastname, email, username, password, mobilenumber
        })
      });

      await res.json();
      if (res.status === 500) {
        window.alert("Guide not added");
        navigate('/addguide');
      }
      else {
        window.alert("Guide Added Successful");
        navigate('/adminhome');
      }
    }

  }

  return (
    <>

      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${tourismImage})`, backgroundPosition: "center", backgroundSize: 'cover', backgroundAttachment:"fixed", position : "sticky" }}>
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: 'white' }}>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"> Add Guide</p>

          <form method="post" className="mx-1 mx-md-4">

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="text" id="firstname" className="form-control" name="firstname" value={guide.firstname} onChange={handleInputs} />
                <label className="form-label" htmlFor="firstname">First Name</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="text" id="lastname" className="form-control" name="lastname" value={guide.lastname} onChange={handleInputs} />
                <label className="form-label" htmlFor="lastname">Last Name</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="email" id="email" className="form-control" name="email" value={guide.email} onChange={handleInputs} />
                <label className="form-label" htmlFor="email">Your Email</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="text" id="username" className="form-control" name="username" value={guide.username} onChange={handleInputs} />
                <label className="form-label" htmlFor="username">Your Username</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="password" id="password" className="form-control" name="password" value={guide.password} onChange={handleInputs} />
                <label className="form-label" htmlFor="password">Password</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="password" id="repeatPassword" className="form-control" name="repeatPassword" value={guide.repeatPassword} onChange={handleInputs} />
                <label className="form-label" htmlFor="repeatPassword">Repeat Password</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input type="text" id="mobilenumber" className="form-control" name="mobilenumber" value={guide.mobilenumber} onChange={handleInputs} />
                <label className="form-label" htmlFor="mobilenumber">Mobile Number</label>
              </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button type="button" className="btn btn-primary btn-lg" onClick={PostData}>Add guide</button>
            </div>

          </form>

        </div>
      </div>
    </>
  );
}
