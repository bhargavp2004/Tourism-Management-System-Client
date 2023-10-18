import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import jwtDecode from 'jwt-decode'; 
import tourImage from '../images/pic2.jpg';
import 'bootstrap/dist/css/bootstrap.css';

import env from "react-dotenv";
// const Razorpay = require('razorpay');
// var instance = new Razorpay({ key_id: process.env.API_KEY, key_secret: process.env.API_SECRET_KEY });

const StyledCard = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

// Create a styled component for the form title
const StyledFormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

// Create a styled component for the form elements
const StyledFormGroup = styled.div`
  margin-bottom: 15px;
`;

// Create a styled component for the checkbox label
const StyledFormCheckLabel = styled.label`
  font-weight: 400;
`;

// Create a styled component for the submit button
const StyledSubmitButton = styled.button`
  background-color: #007bff;
  border-color: #007bff;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

function TravellersDetails() {


  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state.bookingData;
  const [userid, setUserid] = useState('');

  const cost = bookingData.bookingCost;

  useEffect(() => {

    console.log(process.env.REACT_APP_API_KEY);
    console.log(process.env.REACT_APP_API_SECRET_KEY);
    
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Token : ", decodedToken);
        setUserid(decodedToken.user.id);
        bookingData.book_user = decodedToken.user.id;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);


  const [adultTravelers, setAdultTravelers] = useState([]);
  const [childTravelers, setChildTravelers] = useState([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);



  useEffect(() => {

    const generateInputs = () => {
      const allAdultTravelers = [];
      const allChildTravelers = [];

      // Generate inputs for adults
      for (let i = 0; i < bookingData.book_adult; i++) {
        allAdultTravelers.push({
          type: "adult",
          name: "",
          age: "",
          gender: "",
        });
      }

      // Generate inputs for children
      for (let i = 0; i < bookingData.book_child; i++) {
        allChildTravelers.push({
          type: "child",
          name: "",
          age: "",
          gender: "",
        });
      }

      setAdultTravelers(allAdultTravelers);
      setChildTravelers(allChildTravelers);
    };

    generateInputs();
  }, [bookingData.book_adult, bookingData.book_child]);



  const handleAdultTravelerChange = (index, e) => {
    const updatedAdultTravelers = [...adultTravelers];
    updatedAdultTravelers[index][e.target.name] = e.target.value;
    setAdultTravelers(updatedAdultTravelers);
  };

  const handleChildTravelerChange = (index, e) => {
    const updatedChildTravelers = [...childTravelers];
    updatedChildTravelers[index][e.target.name] = e.target.value;
    setChildTravelers(updatedChildTravelers);
  };

  const handleAgreementChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };


  const datepackid = bookingData.book_pack;
  
  const [packageData, setPackageData] = useState(null);

  const [packages, setPackages] = useState({
    package_name: "",
    package_overview: "",
    package_days: "",
    package_price: "",
    package_place: [],
    package_guide: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/getPackageById/${datepackid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPackageData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  
    fetchData();
  }, []);

  async function updatepack(abc) {
    try {
      const response = await fetch(
        `http://localhost:5000/updatepackdate/${packageData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(abc),
        }
      );

      if (response.ok) {
        return
      } else {
        console.error("Error updating Pack date:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Pack date:", error);
    }
  }

    var packageName, packImage;
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getpackagebypackdate/${bookingData.book_pack}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          packageName = data.package_name
          packImage = data.img_url;
        } else {
          console.error("Error fetching packages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };


  const initPayment = async (data, bookingData, successCallback) => {
    console.log("Inside initPayment function");
    console.log(process.env.REACT_APP_API_KEY);
    console.log(data.id);
    const amount_to_pay = bookingData.book_cost * 100;
    console.log(amount_to_pay);
    await fetchData();
  
    const options = {
      key: process.env.REACT_APP_API_KEY,
      amount: amount_to_pay,
      currency: data.currency,
      name: `Package : ${packageName}`,
      description: "Testing",
      image: packImage,
      order_id: data.id,
      handler: async (response) => {
        try {
          console.log("Inside handler function");
          console.log(response);

          const newResponse = {
            response,
            bookingData
          };
          console.log(newResponse);

          const apiResponse = await fetch("http://localhost:5000/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newResponse),
          });

          const responseData = await apiResponse.json();
          console.log(responseData.message);

          if (apiResponse.status === 200) {
            successCallback();
            window.alert("Your Bookings Are Confirmed");
            navigate('/Home');
          } else {
            throw new Error("Booking Failed");
          }
        } catch (error) {
          console.error("Error in handler function:", error);
        }
      },
    };
    console.log(packages);
    console.log("Name ", options.name);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const successCallback = () => {
      var mem = parseInt(bookingData.book_adult,10);
      mem = mem + parseInt(bookingData.book_child,10);
      packageData.rem_book = (packageData.rem_book - mem);
      updatepack(packageData);
    };
    
    if (!agreedToTerms) {
      alert("Please agree to the terms before booking.");
      return;
    }

    bookingData.book_travellers = [...adultTravelers, ...childTravelers];
    console.log(bookingData);
    try {
      const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (response.status === 200) {
        const resData = await response.json();
        console.log('Booking created:', resData.savedBooking);
        console.log("Order details:", resData.data);
        initPayment(resData.data, resData.savedBooking, successCallback);
      } else {
        console.error('Error creating booking');
      }
    } catch (error) {
      console.error('Error sending booking data:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-400">
      <StyledCard>
        <div className="card-body">
          <StyledFormTitle>Enter Travellers Details</StyledFormTitle>
          <form onSubmit={handleSubmit}>
            {adultTravelers.map((traveler, index) => (
              <StyledFormGroup key={index}>
                <h3>Adult {index + 1}</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={traveler.name}
                    onChange={(e) => handleAdultTravelerChange(index, e)}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={traveler.age}
                    onChange={(e) => handleAdultTravelerChange(index, e)}
                    placeholder="Age"
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="gender"
                    value={traveler.gender}
                    onChange={(e) => handleAdultTravelerChange(index, e)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </StyledFormGroup>
            ))}
            {childTravelers.map((traveler, index) => (
              <StyledFormGroup key={index}>
                <h3>Child {index + 1}</h3>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={traveler.name}
                    onChange={(e) => handleChildTravelerChange(index, e)}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    name="age"
                    value={traveler.age}
                    onChange={(e) => handleChildTravelerChange(index, e)}
                    placeholder="Age"
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control"
                    name="gender"
                    value={traveler.gender}
                    onChange={(e) => handleChildTravelerChange(index, e)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </StyledFormGroup>
            ))}
            <StyledFormGroup>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                  checked={agreedToTerms}
                  onChange={handleAgreementChange}
                />
                <StyledFormCheckLabel htmlFor="agreement">
                  I agree to the terms and conditions.
                </StyledFormCheckLabel>
              </div>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledSubmitButton
                type="submit"
                className="btn btn-primary"
                disabled={!agreedToTerms}
              >
                Book By Paying {bookingData.book_cost}
              </StyledSubmitButton>
            </StyledFormGroup>
          </form>
        </div>
      </StyledCard>
    </div>
  );
}

export default TravellersDetails;