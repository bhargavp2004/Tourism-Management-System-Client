import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/Booking.css';
import { useLocation } from "react-router-dom";


function Booking() {
  const [packages, setPackages] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const selectedDate = location.state.selectedDate;
  const navigate = useNavigate();
  
  const [bookingData, setBookingData] = useState({
    book_date: "",
    book_adult: 0,
    book_child: 0,
    book_cost: 0,
    book_user: "", 
    book_pack: "", 
    book_travellers: [],
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
    pricegenerator();
  }, [bookingData.book_child, bookingData.book_adult]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    const newValue = value < 0 ? 0 : value;
    setBookingData({
      ...bookingData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    console.log(selectedDate);
    e.preventDefault();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    bookingData.book_date = formattedDate;
    bookingData.book_pack = selectedDate._id;
    // Handle form submission, you can send bookingData to the server or perform other actions
    console.log(bookingData);

    navigate("/traveler", { state: { bookingData } });
  };

  function pricegenerator() {
    bookingData.book_cost = 0;
    let cost = bookingData.book_adult * packages.package_price;
    cost = cost + bookingData.book_child * packages.package_price;
    bookingData.book_cost = cost;
  }

  return (
    <>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row align-items-center justify-content-center">
            {/* Initial Booking Form (Centered) */}
            {!showDetailsForm && (
              <div className="col-md-6">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <div className="text-center">
                      <h1 className="fw-bold mb-5">Book</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="book_adult" className="form-label">
                          Adult
                        </label>
                        <input
                          type="number"
                          id="book_adult"
                          className="form-control"
                          name="book_adult"
                          value={bookingData.book_adult}
                          onChange={handleInputs}
                          required
                        />
                      </div>

                        <div className="mb-4">
                          <label htmlFor="book_child" className="form-label">
                            Children
                          </label>
                          <input
                            type="number"
                            id="book_child"
                            className="form-control"
                            name="book_child"
                            value={bookingData.book_child}
                            onChange={handleInputs}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="book_cost" className="form-label">
                            Booking Cost
                          </label>
                          <input
                            type="number"
                            id="book_cost"
                            disabled
                            className="form-control"
                            name="book_cost"
                            value={
                              bookingData.book_cost ? bookingData.book_cost : 0
                            }
                            onChange={handleInputs}
                            required
                          />
                        </div>

                      {/* Select User */}
                      {/* Select Package */}
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={() => setShowDetailsForm(true)}
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Traveler Details Form */}
            {showDetailsForm && (
              <div className="col-md-6">
                <div className="card text-black">
                  <div className="card-body p-md-5">
                    <form onSubmit={handleFinalSubmit}>
                      {/* Render adult traveler forms */}
                      {adultTravelers.map((traveler, index) => (
                        <div key={`adult_${index}`} className="mb-4">
                          <label htmlFor={`adult_name_${index}`} className="form-label">
                            Adult {index + 1} Name
                          </label>
                          <input
                            type="text"
                            id={`adult_name_${index}`}
                            className="form-control"
                            name={`adult_name_${index}`}
                            value={traveler.name}
                            onChange={(e) => handleTravelerInputs('adult', index, e)}
                            required
                          />
                          <label htmlFor={`adult_age_${index}`} className="form-label">
                            Adult {index + 1} Age
                          </label>
                          <input
                            type="number"
                            id={`adult_age_${index}`}
                            className="form-control"
                            name={`adult_age_${index}`}
                            value={traveler.age}
                            onChange={(e) => handleTravelerInputs('adult', index, e)}
                            required
                          />
                          {/* Gender Selection */}
                          <div className="mb-2">
                            <label className="form-label">Gender</label>
                            <div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`adult_gender_${index}`}
                                  id={`adult_male_${index}`}
                                  value="male"
                                  checked={traveler.gender === 'male'}
                                  onChange={(e) => handleTravelerInputs('adult', index, e)}
                                />
                                <label className="form-check-label" htmlFor={`adult_male_${index}`}>
                                  Male
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`adult_gender_${index}`}
                                  id={`adult_female_${index}`}
                                  value="female"
                                  checked={traveler.gender === 'female'}
                                  onChange={(e) => handleTravelerInputs('adult', index, e)}
                                />
                                <label className="form-check-label" htmlFor={`adult_female_${index}`}>
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Render child traveler forms */}
                      {childTravelers.map((traveler, index) => (
                        <div key={`child_${index}`} className="mb-4">
                          <label htmlFor={`child_name_${index}`} className="form-label">
                            Child {index + 1} Name
                          </label>
                          <input
                            type="text"
                            id={`child_name_${index}`}
                            className="form-control"
                            name={`child_name_${index}`}
                            value={traveler.name}
                            onChange={(e) => handleTravelerInputs('child', index, e)}
                            required
                          />
                          <label htmlFor={`child_age_${index}`} className="form-label">
                            Child {index + 1} Age
                          </label>
                          <input
                            type="number"
                            id={`child_age_${index}`}
                            className="form-control"
                            name={`child_age_${index}`}
                            value={traveler.age}
                            onChange={(e) => handleTravelerInputs('child', index, e)}
                            required
                          />
                          {/* Gender Selection */}
                          <div className="mb-2">
                            <label className="form-label">Gender</label>
                            <div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`child_gender_${index}`}
                                  id={`child_male_${index}`}
                                  value="male"
                                  checked={traveler.gender === 'male'}
                                  onChange={(e) => handleTravelerInputs('child', index, e)}
                                />
                                <label className="form-check-label" htmlFor={`child_male_${index}`}>
                                  Male
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={`child_gender_${index}`}
                                  id={`child_female_${index}`}
                                  value="female"
                                  checked={traveler.gender === 'female'}
                                  onChange={(e) => handleTravelerInputs('child', index, e)}
                                />
                                <label className="form-check-label" htmlFor={`child_female_${index}`}>
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* ... (your existing form fields) */}
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Booking;