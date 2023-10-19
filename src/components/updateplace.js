import React, { useEffect, useState } from "react";
import PlaceCard from "./placeCard";
import {PulseLoader as DotLoader} from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/UpdatePlace.css';
 
export default function UpdatePlace() {

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    };

    fetchData(); 

  }, []);

 

  return (
    <div className="container-xxl py-5">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {loading ? (
          <div className="container" style={{ width : '100%'}}>
          <DotLoader color="rgb(0, 0, 77)" loading={true} size={20} />
          </div>
        ) : (
          places.length > 0 ? places.map((place) => (
            <div className="col" key={place._id}>
              <div className="card mb-4">
                <img src={`data:${place.contentType};base64,${place.image}`} className="card-img-top" alt="Place" />
                <div className="card-body">
                  <h5 className="card-title">{place.place_name}</h5>
                  <p className="card-text">{place.place_desc}</p>
                  <button
                    onClick={() => navigate(`/updateplacedetails/${place.place_id}`)}
                    className="btn btn-primary"
                  >
                    Update Place
                  </button>
                </div>
              </div>
            </div>
          )) : <div className="container" style={{backgroundColor : "rgba(0, 0, 77, 0.9"}}><h1 style={{padding : "20px", color :"white"}}>No Places Available.</h1></div>
        )}
      </div>
    </div>
  );
}
