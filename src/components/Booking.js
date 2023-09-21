import React, { useEffect, useState } from 'react';
//analyze
function Booking() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/packages");
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

  const [bookingData, setBookingData] = useState({
    book_date: '',
    book_adult: 0,
    book_child: 0,
    book_cost: 0,
    book_user: '', // You'll need to select a user
    book_pack: '', // You'll need to select a package
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });


  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

    setBookingData({
        ...bookingData,
        book_date: formattedDate,
      });
    // Handle form submission, you can send bookingData to the server or perform other actions
    console.log(bookingData);
  };

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
                            Adults
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
                            className="form-control"
                            name="book_cost"
                            value={bookingData.book_cost}
                            onChange={handleInputs}
                            required
                          />
                        </div>

                        {/* Select User */}
                        

                        {/* Select Package */}


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            {bookingData.book_cost}
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* Image */}
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
