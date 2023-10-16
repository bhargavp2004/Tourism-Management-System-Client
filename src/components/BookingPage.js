import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import jwtDecode from "jwt-decode";
import CommentSection from "./CommentSection";
import 'bootstrap/dist/css/bootstrap.css';
import { PulseLoader as DotLoader } from "react-spinners";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [placeloading, setplaceloading] = useState(true);
  const [dateloading, setdateloading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { id } = decodedToken.user;

        setUserid(id);
      } catch (error) {
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
        console.log("Dates saved successfully!");
        window.location.reload();
      } else {
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
    package_place: [],
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

    fetchData();
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
      finally {
        setplaceloading(false);
      }
    };

    fetchData();
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
      finally {
        setdateloading(false);
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
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title display-4 mb-4 text-primary">Package Details</h1>
          <p className="card-text lead"><strong>Package Name: {packageData.package_name}</strong></p>
          <p className="card-text lead"><strong>Package Overview: {packageData.package_overview}</strong></p>
          <p className="card-text lead"><strong>Package Days: {packageData.package_days}</strong></p>
          <p className="card-text lead"><strong>Package Price: Rs. {packageData.package_price}</strong></p>

          <h2 className="mt-4 text-primary">Associated Places</h2>
          {placeloading ? (<div className="text-center justify-content-center">
            <DotLoader color="rgb(0, 0, 77)" loading={true} size={25} />
          </div>) :
            <ul className="list-group mb-4">
              {placeData.map((place) => (
                <li key={place._id} className="list-group-item">
                  <h4 className="mb-0">{place.place_name}</h4>
                  <p className="mb-0">{place.place_desc}</p>
                </li>
              ))}
            </ul>
          }
          <h2 className="mt-4 text-primary">Select Date</h2>
          <form>
            {dateloading ? (<div className="text-center justify-content-center">
              <DotLoader color="rgb(0, 0, 77)" loading={true} size={50} />
            </div>) : dates.map((date) => (
              <div key={date._id} className="form-check mb-2">
                <input
                  type="radio"
                  id={`date_${date._id}`}
                  name="selectedDate"
                  value={date.start_date}
                  onChange={() => handleDateSelection(date)}
                  className="form-check-input"
                />
                <label htmlFor={`date_${date._id}`} className="form-check-label">
                  {formatDate(date.start_date)} - {formatDate(date.end_date)}{" "}
                  <span className="badge bg-success">Remaining: {date.rem_book}</span>
                </label>
              </div>
            ))}
          </form>

          {isAdmin && (
            <>
              <button className="btn btn-primary mt-3" onClick={handleAddDateClick}>
                {showDateInputs ? "Hide Date Inputs" : "Add Date"}
              </button>
              {showDateInputs && (
                <>
                  <div className="form-group mt-3">
                    <input
                      type="date"
                      id="start_date"
                      className="form-control"
                      name="start_date"
                      value={startDate}
                      onChange={handleStartDateChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="date"
                      id="end_date"
                      className="form-control"
                      name="end_date"
                      value={endDate}
                      onChange={handleEndDateChange}
                    />
                  </div>
                  <button className="btn btn-success mt-3" onClick={handleSaveClick}>
                    Save
                  </button>
                </>
              )}
            </>
          )}
          {!isAdmin && (
            <button className="btn btn-success mt-3" onClick={handleBook}>
              Book Now
            </button>
          )}
        </div>
      </div>
      <CommentSection packid={id}></CommentSection>
    </div>
  );
}