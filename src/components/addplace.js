import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tourismImage from "../images/pic4.jpg";

export default function AddPlace() {
  const navigate = useNavigate();
  const [place, setPlace] = useState({
    place_name: "",
    place_desc: "",
    title: "",
    image: null,
  });

  const handleInputs = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setPlace({ ...place, [name]: files[0] });
    } else {
      setPlace({ ...place, [name]: value });
    }
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { place_name, place_desc, title, image } = place;

    if (!place_name || !place_desc || !title || !image) {
      window.alert("Fill all the fields properly");
      return;
    }

    const formData = new FormData();
    formData.append("place_name", place_name);
    formData.append("place_desc", place_desc);
    formData.append("title", title);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/addPlace", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.status === 201) {
        window.alert("Registration Successful");
        navigate("/adminhome");
      } else {
        window.alert("Registration failed");
        navigate("/addplace");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while processing your request.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${tourismImage})`, backgroundPosition: "center", backgroundAttachment:"fixed", backgroundSize: 'cover' }}>
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1" style={{ backgroundColor: 'white' }}>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Add Place
          </p>

          <form method="post" encType="multipart/form-data" className="mx-1 mx-md-4">
            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="place_name"
                  className="form-control"
                  name="place_name"
                  value={place.place_name}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="place_name">
                  Place Name
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="place_desc"
                  className="form-control"
                  name="place_desc"
                  value={place.place_desc}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="place_desc">
                  Place Description
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  name="title"
                  value={place.title}
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="title">
                  Title
                </label>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
              <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <div className="form-outline flex-fill mb-0">
                {/* Use type="file" for the image input */}
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  name="image"
                  onChange={handleInputs}
                />
                <label className="form-label" htmlFor="image">
                  Upload Image
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={PostData}
              >
                Add Place
              </button>
            </div>
          </form>
        </div>

      </div>

    </>
  );
}