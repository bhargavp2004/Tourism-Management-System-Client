import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import jwtDecode from "jwt-decode";
import CommentSection from "./CommentSection";
export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    // Check if a token exists
    if (token) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(token);
        // Extract the username from the payload (adjust this based on your token structure)
        const { id } = decodedToken.user;
        // Set the username in the component's state
        setUserid(id);
      } catch (error) {
        // Handle any decoding errors
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const { isLoggedIn, isAdmin } = useContext(GlobalContext);
  const [showDateInputs, setShowDateInputs] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddDateClick = () => {
    setShowDateInputs(!showDateInputs);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSaveClick = async () => {
    console.log("Hello");
    try {
      const response = await fetch(`http://localhost:5000/addDate/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (response.ok) {
        // Handle success
        console.log("Dates saved successfully!");
        window.location.reload();
      } else {
        // Handle error
        console.error("Error saving dates:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving dates:", error);
    }
  };

  const [packageData, setPackages] = useState({
    package_name: "",
    package_overview: "",
    package_days: "",
    package_price: "",
    package_place: [], // Initialize as an empty array
    package_guide: "",
  });

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/packages/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          console.error("Error fetching packages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const [placeData, getplaces] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getplaces/${id}`);
        if (response.ok) {
          const data = await response.json();
          getplaces(data);
        } else {
          console.error("Error fetching packages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getDates/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDates(data);
        } else {
          console.error("Error fetching dates:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };
    fetchDates();
  }, []);

  const [selectedDate, setSelectedDate] = useState({});

  function handleBook() {
    navigate(`/bookPackage/${id}`, { state: { selectedDate } });
  }

  function handleDateSelection(date) {
    setSelectedDate(date);
  }

  return (
    <div className="container-fluid">
      <h1>Package Details</h1>
      <p>Package Name: {packageData.package_name}</p>
      <p>Package Overview: {packageData.package_overview}</p>
      <p>Package Days: {packageData.package_days}</p>
      <p>Package Price: Rs. {packageData.package_price}</p>

      <h2>Associated Places</h2>
      <ul>
        {placeData.map((place) => (
          <li key={place._id}>
            <p>Place Name: {place.place_name}</p>
            <p>Place Description: {place.place_desc}</p>
            {/* Add more place details here */}
          </li>
        ))}
      </ul>

      <h2>Select Date</h2>
      <form>
        {dates.map((date) => (
          <div key={date._id}>
            <input
              type="radio"
              id={`date_${date._id}`}
              name="selectedDate"
              value={date.start_date}
              onChange={() => handleDateSelection(date)}
              style={{ marginRight: 10 + "px" }}
            />
            <label htmlFor={`date_${date._id}`}>
              {formatDate(date.start_date)} - {formatDate(date.end_date)}{" "}
              Booking Remaining : {date.rem_book}
            </label>
          </div>
        ))}
      </form>

      {isAdmin && (
        <>
          <button className="btn btn-primary" onClick={handleAddDateClick}>
            {showDateInputs ? "Hide Date Inputs" : "Add Date"}
          </button>
          {showDateInputs && (
            <>
              {/* Date input fields */}
              <div className="mb-4">
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="date"
                      id="start_date"
                      className="form-control"
                      name="start_date"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                    <label className="form-label" htmlFor="start_date">
                      Start Date
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="date"
                      id="end_date"
                      className="form-control"
                      name="end_date"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                    <label className="form-label" htmlFor="end_date">
                      End Date
                    </label>
                  </div>
                </div>
              </div>
              {/* Save button */}
              <button className="btn btn-primary" onClick={handleSaveClick}>
                Save
              </button>
            </>
          )}
        </>
      )}
      {!isAdmin && (
        <button value="Book" className="btn btn-primary" onClick={handleBook}>
          Book
        </button>
      )}
      <CommentSection packid = {id}></CommentSection>
    </div>
  );
}
