import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PulseLoader as DotLoader } from "react-spinners";
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

  const [imageloading, setimageloading] = useState(true);
  const [placeloading, setplaceloading] = useState(true);
  const [deleting, setdeleting] = useState(false);

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/fetchImage/${id}`);
        console.log("IMage : ");
        console.log(response);
        const data = await response.json();
        if (response.ok) {
          setImageSrc(`data:${data.contentType};base64,${data.image}`);
        } else {
          console.error("Error fetching image:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
      finally{
        setimageloading(false);
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
      finally{
        setplaceloading(false);
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
    console.log(places);
    try {
      const response = await fetch(`http://localhost:5000/updatePlace/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(places),
      });

      if (response.ok) {
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
      setdeleting(true);
      const response = await fetch(`http://localhost:5000/deletePlace/${id}`, {
        method: "POST",
      });
      if(response.ok)
      {
        window.alert("Deletion Successful");
        navigate("/adminhome");
      }
      else{
        throw new Error("Error Deleting Place");
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      alert("An error occurred while deleting the Palce.");
    }
    finally{
      setdeleting(false);
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
              {placeloading ? ( <div className="text-center">
                  <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                </div>) : <input
                type="text"
                id="place_name"
                name="place_name"
                value={places.place_name}
                onChange={handleChange}
                className="form-control"
              />}
            </div>
            <div className="mb-3">
              <label htmlFor="place_desc" className="form-label">
                place_desc :
              </label>
              {placeloading ? ( <div className="text-center">
                  <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                </div>) : <textarea
                id="place_desc"
                name="place_desc"
                value={places.place_desc}
                onChange={handleChange}
                className="form-control"
              />}
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
                {imageloading ? ( <div className="text-center">
                  <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                </div>) : imageSrc && (
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
              {deleting ? (
                <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
              ) : (
                "Delete Place"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}