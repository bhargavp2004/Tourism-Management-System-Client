import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {PulseLoader as DotLoader} from "react-spinners";

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

export default function Updatepackdetails(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("hello");
  console.log(id);
  const [places, setPlaces] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingguide, setLoadingguide] = useState(true);
  const [deleting, setdeleting] = useState(false);

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
      finally{
        setLoading(false);
      }

      try {
        const response = await fetch("http://localhost:5000/guides");
        if (response.ok) {
          const data = await response.json();
          setGuides(data);
        } else {
          console.error("Error fetching guides:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
      finally {
        setLoadingguide(false);
      }

    };

    fetchData();
  }, []);

  const [packages, setPackage] = useState({
    package_name: "",
    package_overview: "",
    package_days: "",
    package_price: "",
    package_place: [], // Initialize as an empty array
    package_guide: "", // Initialize as an empty array
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      try {
        const response = await fetch(`http://localhost:5000/packages/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPackage(data);
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
    setPackage({ ...packages, [name]: value });
  };

  const handlePlaceCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // If the checkbox is checked, add the place ID to the array
      setPackage({
        ...packages,
        package_place: [...packages.package_place, value],
      });
    } else {
      // If the checkbox is unchecked, remove the place ID from the array
      setPackage({
        ...packages,
        package_place: packages.package_place.filter(
          (placeId) => placeId !== value
        ),
      });
    }
  };

  const handleGuidesChange = (e) => {
    const { name, options } = e.target;
    const selectedGuides = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setPackage({ ...packages, [name]: selectedGuides });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response = await fetch(
        `http://localhost:5000/updatePackage/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(packages),
        }
      );

      if (response.ok) {
        // Package updated successfully
        // You can redirect to the package details page or show a success message
        navigate("/adminhome");
      } else {
        console.error("Error updating package:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  const handleDelete = async () => {

    try {
      setdeleting(true);
      const response = await fetch(`http://localhost:5000/deletePackage/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        window.alert("Package deleted successfully");
        navigate("/adminhome");
      } else {
        const responseData = await response.json();
       
        alert(responseData.message);
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      // Display a generic error message for network or server errors
      alert("An error occurred while deleting the package.");
    }
    finally{
      setdeleting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Update Package</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="package_name" className="form-label">
                Package Name:
              </label>
              <input
                type="text"
                id="package_name"
                name="package_name"
                value={packages.package_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="package_overview" className="form-label">
                Package Overview:
              </label>
              <textarea
                id="package_overview"
                name="package_overview"
                value={packages.package_overview}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="package_days" className="form-label">
                Package Days:
              </label>
              <input
                type="text"
                id="package_days"
                name="package_days"
                value={packages.package_days}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="package_price" className="form-label">
                Package Price:
              </label>
              <input
                type="text"
                id="package_price"
                name="package_price"
                value={packages.package_price}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Package Places:</label>
              {loading ? ( 
                <div className="text-center">
                  <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                </div>
              ) : (places.length > 0 ? places.map((place) => (
                <div key={place.place_id} className="form-check">
                  <input
                    type="checkbox"
                    id={`place_${place.place_id}`}
                    name="package_place"
                    value={place.place_id}
                    checked={packages.package_place.includes(place.place_id)}
                    onChange={handlePlaceCheckboxChange}
                    className="form-check-input"
                  />
                  <label
                    htmlFor={`place_${place.place_id}`}
                    className="form-check-label"
                  >
                    {place.place_name}
                  </label>
                </div>
              )) : <div className="container" style={{backgroundColor : "rgba(0, 0, 77, 0.9"}}><h1 style={{padding : "20px", color :"white"}}>No Places Available.</h1></div>)}
            </div>

            <div className="mb-3">
              <label htmlFor="package_guide" className="form-label">
                Package Guide:
              </label>
              {loadingguide ? (
                <div className="text-center">
                  <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                </div>
              ) : (<select
                id="package_guide"
                name="package_guide"
                value={packages.package_guide}
                onChange={handleGuidesChange}
                className="form-select"
              >
                <option value="">Select a Guide</option>
                {guides.map((guide) => (
                  <option key={guide._id} value={guide._id}>
                    {guide.username}
                  </option>
                ))}
              </select>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Update Package
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              {deleting ?  <div className="text-center">
                  <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                </div> : ("Delete Package")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
