import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const styles = {
  selectContainer: {
    marginBottom: "20px",
  },
  selectLabel: {
    fontWeight: "bold",
  },
  selectDropdown: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  },
  // Add more styles here
};

export default function Updateplacedetails(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [places, setplace] = useState({
    place_name: "",
    place_desc: "",
    image: null,
  });

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/fetchImage/${id}`);
        if (response.ok) {
          // Get the image data from the response
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);

          // Set the image source URL
          setImageSrc(imageUrl);
        } else {
          console.error("Error fetching image:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/places/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setplace(data);
        } else {
          console.error("Error fetching package:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setplace({ ...places, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response = await fetch(`http://localhost:5000/updatePlace/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(places),
      });

      if (response.ok) {
        // Package updated successfully
        // You can redirect to the package details page or show a success message
        navigate("/adminhome");
      } else {
        console.error("Error updating Plae:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating Place:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/deletePlace/${id}`, {
        method: "POST",
      });

      navigate("/adminhome");
    } catch (error) {
      console.error("Error deleting place:", error);
      // Display a generic error message for network or server errors
      alert("An error occurred while deleting the Palce.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Update Place</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="place_name" className="form-label">
                place_name :
              </label>
              <input
                type="text"
                id="place_name"
                name="place_name"
                value={places.place_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="place_desc" className="form-label">
                place_desc :
              </label>
              <textarea
                id="place_desc"
                name="place_desc"
                value={places.place_desc}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) =>
                  setplace({ ...places, image: e.target.files[0] })
                }
                className="form-control"
              />
              <div>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Place Image"
                    style={{ maxWidth: "100%" }}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Update Place
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Place
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
