import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Updatepackdetails(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch places data
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

      // Fetch guides data
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

  const handlePlacesChange = (e) => {
    const { name, options } = e.target;
    const selectedPlaces = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setPackage({ ...packages, [name]: selectedPlaces });
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
      const response = await fetch(`http://localhost:5000/updatePackage/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packages),
      });

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

  return (
    <div>
      <h2>Update Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="package_name">Package Name:</label>
          <input
            type="text"
            id="package_name"
            name="package_name"
            value={packages.package_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="package_overview">Package Overview:</label>
          <textarea
            id="package_overview"
            name="package_overview"
            value={packages.package_overview}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="package_days">Package Days:</label>
          <input
            type="text"
            id="package_days"
            name="package_days"
            value={packages.package_days}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="package_price">Package Price:</label>
          <input
            type="text"
            id="package_price"
            name="package_price"
            value={packages.package_price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="package_place">Package Places:</label>
          <select
            id="package_place"
            name="package_place"
            multiple
            value={packages.package_place}
            onChange={handlePlacesChange}
          >
            {places.map((place) => (
              <option key={place._id} value={place._id}>
                {place.place_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="package_guide">Package Guides:</label>
          <select
            id="package_guide"
            name="package_guide"
            multiple
            value={packages.package_guide}
            onChange={handleGuidesChange}
          >
            {guides.map((guide) => (
              <option key={guide._id} value={guide._id}>
                {guide.guide_name}
              </option>
            ))}
          </select>
        </div>
        {/* Add input fields for other package properties */}
        <button type="submit">Update Package</button>
      </form>
    </div>
  );
}
