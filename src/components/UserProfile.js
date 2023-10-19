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

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cancelBooking/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCurrBook((prevCurrBook) =>
          prevCurrBook.filter((booking) => booking._id !== bookingId)
        );
      } else {
        console.error("Error canceling booking:", response.statusText);
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const [selectedTab, setSelectedTab] = useState("user-details");

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const cardStyle = {
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    borderRadius: "5px",
    marginBottom: "20px",
  };

  const listItemStyle = {
    backgroundColor: "#f7f7f7",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const headingStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const dateStyle = {
    fontStyle: "italic",
    color: "#777",
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div style={cardStyle}>
            <h5 style={headingStyle}>Navigation</h5>
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
        <div className="col-md-9">
          {selectedTab === "user-details" && (
            <div style={cardStyle}>
              <h5 style={headingStyle}>Update User</h5>
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
          )}
          {selectedTab === "current-bookings" && (
            <div style={cardStyle}>
              <h5 style={headingStyle}>Current Bookings</h5>
              <ul>
                {Array.isArray(currbook) && currbook[0] !== null ? (
                  currbook.length > 0 ? (
                    currbook.map((booking, index) => (
                      <li key={index} style={listItemStyle}>
                        <p>No of Adults: {booking.book_adult}</p>
                        <p>No of Children: {booking.book_child}</p>
                        <p style={dateStyle}>
                          Booked Date:{" "}
                          {new Date(booking.book_date).toLocaleDateString(
                            "en-US"
                          )}
                        </p>
                        <p>Cost: {booking.book_cost}</p>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </button>
                      </li>
                    ))
                  ) : (
                    <p>No current bookings available.</p>
                  )
                ) : (
                  <p>No current bookings available.</p>
                )}
              </ul>
            </div>
          )}
          {selectedTab === "history-bookings" && (
            <div style={cardStyle}>
              <h5 style={headingStyle}>History Bookings</h5>
              <ul>
                {bookhist.length > 0 ? (
                  bookhist.map((booking, index) => (
                    <li key={index} style={listItemStyle}>
                      <p>No of Adults: {booking.book_adult}</p>
                      <p>No of Children: {booking.book_child}</p>
                      <p style={dateStyle}>
                        Booked Date:{" "}
                        {new Date(booking.book_date).toLocaleDateString(
                          "en-US"
                        )}
                      </p>
                      <p>Cost: {booking.book_cost}</p>
                    </li>
                  ))
                ) : (
                  <p>No history bookings available.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
