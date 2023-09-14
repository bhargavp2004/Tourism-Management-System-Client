import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tourismImage from "../images/Tourism-Jobs.jpg";

export default function Signup() {
  const [places, setPlaces] = useState([]);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/places");
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
        } else {
          console.error("Error fetching places:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/guides");
        if (response.ok) {
          const data = await response.json();
          setGuides(data);
        } else {
          console.error("Error fetching places:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const navigate = useNavigate();
  const [packages, setPackage] = useState({
    package_name: "",
    package_overview: "",
    package_days: "",
    package_price: "",
    package_place: [],
    package_guide: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
  
    // Handle package_place separately as an array
    if (name === 'package_place') {
      // If the checkbox is checked, add the value to the array
      // If it's unchecked, remove it from the array
      if (e.target.checked) {
        setPackage((prevPackage) => ({
          ...prevPackage,
          package_place: [...prevPackage.package_place, value],
        }));
      } else {
        setPackage((prevPackage) => ({
          ...prevPackage,
          package_place: prevPackage.package_place.filter((placeId) => placeId !== value),
        }));
      }
    } else {
      setPackage({ ...packages, [name]: value });
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    console.log("Post Data called");

    const {
      package_name,
      package_overview,
      package_days,
      package_price,
      package_place,
      package_guide,
    } = packages;

    console.log(package_name);
    console.log(package_overview);
    console.log(package_days);
    console.log(package_price);
    console.log(package_place);
    console.log(package_guide);

    if (
      !package_name ||
      !package_overview ||
      !package_days ||
      !package_price ||
      (package_place.length ===0) ||
      !package_guide
    ) {
      console.log("fill all the fields properly");
      window.alert("Fill all the fields properly");
      navigate("/addpack");
    } else {
      const res = await fetch("http://localhost:5000/addPackage", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          package_name,
          package_overview,
          package_days,
          package_price,
          package_place,
          package_guide,
        }),
      });

      await res.json();
      if (res.status === 400) {
        window.alert("Package Successfully no added");
        navigate("/addpack");
      } else {
        window.alert("Package Added Succesfully");
        navigate("/adminhome");
      }
    }
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
                        Add Package
                      </p>

                      <form method="post" className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="package_name"
                              className="form-control"
                              name="package_name"
                              value={packages.package_name}
                              onChange={handleInputs}
                            />
                            <label
                              className="form-label"
                              htmlFor="package_name"
                            >
                              Package Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="package_overview"
                              className="form-control"
                              name="package_overview"
                              value={packages.package_overview}
                              onChange={handleInputs}
                            />
                            <label
                              className="form-label"
                              htmlFor="package_overview"
                            >
                              Description about package
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="Number"
                              id="package_days"
                              className="form-control"
                              name="package_days"
                              value={packages.package_days}
                              onChange={handleInputs}
                            />
                            <label
                              className="form-label"
                              htmlFor="package_days"
                            >
                              No of Days
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="Number"
                              id="package_price"
                              className="form-control"
                              name="package_price"
                              value={packages.package_price}
                              onChange={handleInputs}
                            />
                            <label
                              className="form-label"
                              htmlFor="package_price"
                            >
                              Package Price
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <div className="border rounded p-3">
                              {" "}
                              {/* Add border and padding */}
                              {places.map((place) => (
                                <div key={place._id} className="form-check">
                                  <input
                                    type="checkbox"
                                    id={`place_${place._id}`}
                                    className="form-check-input"
                                    name="package_place"
                                    value={place._id}
                                    checked={packages.package_place.includes(place._id)}
                                    onChange={handleInputs}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`place_${place._id}`}
                                  >
                                    {place.place_name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          <label className="form-label">Places</label>
                          </div>
                        </div>
                        
                        <div className="mb-4">
  
</div>
                      

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <div className="border rounded p-3">
                              {" "}
                              {guides.map((guide) => (
                                <div key={guide._id} className="form-check">
                                  <input
                                    type="checkbox"
                                    id={`guide_${guide._id}`}
                                    className="form-check-input"
                                    name="package_guide"
                                    value={guide._id}
                                    checked={packages.package_guide.includes(
                                      guide._id
                                    )} // Check if the place is included in selected places
                                    onChange={handleInputs}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={`guide_${guide._id}`}
                                  >
                                    {guide.username}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <label className="form-label">Guides</label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={PostData}
                          >
                            Add Package
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src={tourismImage} className="img-fluid" alt="" />
                    </div>
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