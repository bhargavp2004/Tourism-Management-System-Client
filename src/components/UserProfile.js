import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function UserProfile() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    mobilenumber: "",
  });

  const token = localStorage.getItem("token");
  var userid;
  if (token) {
    const decodedToken = jwtDecode(token);
    const { id } = decodedToken.user;
    userid = id;
  }
  useEffect(() => {
      fetch(`http://localhost:5000/getuser/${userid}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    
  }, []);

  const [bookhist, setbookhist] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/getbook/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setbookhist(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const [currbook, setCurrBook] = useState([]);

  useEffect(() => {
    const currentDate = new Date();

    fetch(`http://localhost:5000/getcurrbook/${userid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCurrBook(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  async function updateuser(abc) {
    try {
      const response = await fetch(
        `http://localhost:5000/updateUser/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(abc),
        }
      );

      if (response.ok) {
        return;
      } else {
        console.error("Error updating Pack date:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Pack date:", error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateuser(user);
    window.location.reload();
  };

  const [selectedTab, setSelectedTab] = useState("user-details");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Navigation</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "user-details" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("user-details")}
                    href="#"
                  >
                    User Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "current-bookings" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("current-bookings")}
                    href="#"
                  >
                    Current Bookings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      selectedTab === "history-bookings" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("history-bookings")}
                    href="#"
                  >
                    History Bookings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          {selectedTab === "user-details" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Update User</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={user.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      value={user.firstname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      value={user.lastname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobilenumber" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="Number"
                      className="form-control"
                      id="mobilenumber"
                      name="mobilenumber"
                      value={user.mobilenumber}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
          {selectedTab === "current-bookings" && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Current Bookings</h5>
                <ul>
                  {currbook.map((booking, index) => (
                    <li key={index}>
                      <p>Date: {booking.book_date}</p>
                      <p>Cost: {booking.book_cost}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {selectedTab === "history-bookings" && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">History Bookings</h5>
                <ul>
                  {bookhist.map((booking, index) => (
                    <li key={index}>
                      <p>Date: {booking.book_date}</p>
                      <p>Cost: {booking.book_cost}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
