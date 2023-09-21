import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import '../styles/homeuser.css';

function Booking() {
  const { id } = useParams();
  const [packages, setPackages] = useState({});

  const [bookingData, setBookingData] = useState({
    book_date: "",
    book_adult: 0,
    book_child: 0,
    book_cost: 0,
    book_user: "", // You'll need to select a user
    book_pack: "", // You'll need to select a package
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
    e.preventDefault();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    setBookingData({
      ...bookingData,
      book_date: formattedDate,
    });
    // Handle form submission, you can send bookingData to the server or perform other actions
    console.log(bookingData);
  };

  function pricegenerator() {
    bookingData.book_cost = 0;
    let cost = bookingData.book_adult * packages.package_price;
    cost = cost + bookingData.book_child * packages.package_price;
    bookingData.book_cost = cost;
  }
  
  // ... (your existing code for useEffect, handleInputs, and handleSubmit)

  // Function to generate an array of travelers based on the count and type (adult or child)
  function generateTravelers(count, type) {
    const travelers = [];
    for (let i = 1; i <= count; i++) {
      travelers.push({
        name: "",
        age: "",
        type, // 'adult' or 'child'
      });
    }
    return travelers;
  }

  const adultTravelers = generateTravelers(bookingData.book_adult, 'adult');
  const childTravelers = generateTravelers(bookingData.book_child, 'child');

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
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Book
                      </p>

                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
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
                        
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4" id="bookbtn">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            data-content={
                              bookingData.book_cost ? bookingData.book_cost : 0
                            }
                          ></button>
                        </div>
                       
                      </form>
                    </div>
                    {/* Image */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
            {/* ... (your existing form fields) */}
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
              </div>
            ))}

            {/* ... (your existing form fields) */}
          </form>
        </div>
      </section>
    </>
  );
}

export default Booking;
