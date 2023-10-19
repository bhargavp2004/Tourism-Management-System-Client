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
};

export default function Updateguidedetails(props) {
  const { id } = useParams();
  const navigate = useNavigate();


  const [guides, setGuide] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    mobilenumber: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      try {
        const response = await fetch(`http://localhost:5000/guide/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setGuide(data);
        } else {
          console.error("Error fetching guide:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching guide:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGuide({ ...guides, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response = await fetch(
        `http://localhost:5000/updateGuide/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(guides),
        }
      );

      if (response.ok) {
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
      const response = await fetch(`http://localhost:5000/deleteGuide/${id}`, {
        method: "POST",
      });
  
      navigate("/adminhome");
    } catch (error) {
      console.error("Error deleting Guide:", error);
      alert("An error occurred while deleting the Guide.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Update Guide</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
              firstname :
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={guides.firstname}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
              lastname :
              </label>
              <input
                id="lastname"
                name="lastname"
                value={guides.lastname}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
              email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={guides.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={guides.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="mobilenumber" className="form-label">
                Mobile Number:
              </label>
              <input
                type="text"
                id="mobilenumber"
                name="mobilenumber"
                value={guides.mobilenumber}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            
            <button type="submit" className="btn btn-primary">
              Update Guide
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete Guide
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
