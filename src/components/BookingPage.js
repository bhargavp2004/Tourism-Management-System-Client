import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
  const [packageData, setPackages] = useState({
    package_name: "",
    package_overview: "",
    package_days: "",
    package_price: "",
    package_place: [], // Initialize as an empty array
    package_guide: "", 
  });

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
 })

  function handleBook(){
    navigate(`/bookPackage/${id}`);
  }
  
  return (
    <div>
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

      <button value="Book" className="btn btn-primary" onClick={handleBook}>Book</button>
      
      {/* You can add more details here */}
    </div>
  );
}
