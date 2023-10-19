import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tourismImage from "../images/pic5.jpg";
import { PulseLoader as DotLoader } from "react-spinners";

export default function AddPackage() {
  const [places, setPlaces] = useState([]);
  const [placesloading, setplacesloading] = useState(true);
  const [guidesloading, setguidesloading] = useState(true);
  const [postingdata, setpostingdata] = useState(false);

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
      finally {
        setplacesloading(false);
      }
    };

    fetchData();
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
      finally {
        setguidesloading(false);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const [packages, setPackage] = useState({
    package_name: "",
    package_overview: "",
    package_days: "",
    package_price: "",
    package_capacity: "",
    package_place: [],
    package_guide: "",
    start_date: "",
    end_date: "",
    img_url: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === 'package_place') {

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
    setpostingdata(true);

    const {
      package_name,
      package_overview,
      package_days,
      package_price,
      package_capacity,
      package_place,
      package_guide,
      start_date,
      end_date,
      img_url
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
      (package_place.length === 0) ||
      !package_guide ||
      !package_capacity ||
      !start_date || !end_date
    ) {
      setpostingdata(false);
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
          package_capacity,
          package_place,
          package_guide,
          start_date,
          end_date,
          img_url
        }),
      });

      await res.json();
      if (res.status === 400) {
        setpostingdata(false);
        window.alert("Package Upload Failed");
        navigate("/addpack");
      } else {
        setpostingdata(false);
        window.alert("Package Added Succesfully");
        navigate("/adminhome");
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center" style={{ backgroundImage: `url(${tourismImage})`, backgroundPosition: "center", backgroundAttachment: "fixed", backgroundSize: 'cover', position: "sticky" }}>
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: 'white' }}>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Add Package
          </p>

          <form method="post" className="mx-1 mx-md-4">
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-user fa-lg me-3 fa-fw"></i>
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
              <i className="fa fa-user fa-lg me-3 fa-fw"></i>
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
              <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
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
              <i className="fa fa-key fa-lg me-3 fa-fw"></i>
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
              <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="Number"
                  id="package_capacity"
                  className="form-control"
                  name="package_capacity"
                  value={packages.package_capacity}
                  onChange={handleInputs}
                />
                <label
                  className="form-label"
                  htmlFor="package_capacity"
                >
                  Capacity
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="Text"
                  id="img_url"
                  className="form-control"
                  name="img_url"
                  value={packages.img_url}
                  onChange={handleInputs}
                />
                <label
                  className="form-label"
                  htmlFor="package_capacity"
                >
                  Image Url
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <div className="border rounded p-3">
                  {placesloading ?
                    (<div className="text-center">
                      <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                    </div>) : places.map((place) => (
                      <div key={place.place_id} className="form-check">
                        <input
                          type="checkbox"
                          id={`place_${place.place_id}`}
                          className="form-check-input"
                          name="package_place"
                          value={place.place_id}
                          checked={packages.package_place.includes(place.place_id)}
                          onChange={handleInputs}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`place_${place.place_id}`}
                        >
                          {place.place_name}
                        </label>
                      </div>
                    ))}
                </div>
                <label className="form-label">Places</label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <div className="border rounded p-3">
                  {" "}
                  {guidesloading ? (
                    <div className="text-center">
                      <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                    </div>
                  ) : guides.map((guide) => (
                    <div key={guide._id} className="form-check">
                      <input
                        type="checkbox"
                        id={`guide_${guide._id}`}
                        className="form-check-input"
                        name="package_guide"
                        value={guide._id}
                        checked={packages.package_guide.includes(
                          guide._id
                        )}
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
            <div className="mb-4">
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                  <input
                    type="date"
                    id="start_date"
                    className="form-control"
                    name="start_date"
                    value={packages.start_date}
                    onChange={handleInputs}
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
                    value={packages.end_date}
                    onChange={handleInputs}
                  />
                  <label className="form-label" htmlFor="end_date">
                    End Date
                  </label>
                </div>
              </div>
            </div>

            {postingdata ? (<div className="text-center">
              <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
            </div>) : (<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={PostData}
              >
                Add Package
              </button>
            </div>)}
          </form>
        </div>
      </div>

    </>
  );
}
