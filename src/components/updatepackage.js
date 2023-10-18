import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./packageCard";
import tourismImage from '../images/pic3.jpg';
import { NavLink } from "react-router-dom";
import {PulseLoader as DotLoader} from "react-spinners";

export default function Updatepackage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [packageLoading, setpackageLoading] = useState(true);
  const [guideUsernames, setGuideUsernames] = useState({}); 
  const [guideLoading, setguideLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/packages");
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        } else {
          console.error("Error fetching places:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
      finally{
        setpackageLoading(false);
      }
    };

    fetchData(); // Call the async function

    // Fetch guide usernames when the component mounts
    fetchGuideUsernames();
  }, []);

  async function fetchGuideUsernames() {
    try {
      const response = await fetch("http://localhost:5000/guideUsernames");
      if (response.ok) {
        const data = await response.json();
        // Store guide usernames in state
        setGuideUsernames(data);
      } else {
        console.error("Error fetching guide usernames:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching guide usernames:", error);
    }
    finally{
      setguideLoading(false);
    }
  }

  return (
    <div className="container-xxl py-5">
      <div className="row row-cols-1 row-cols-md-4 g-4">

        {packageLoading ? (
           <div className="text-center">
           <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
         </div>
        ) : (packages.length > 0 ? packages.map((pack) => (
          <div className="col" key={pack._id}>
            <div className="card mb-4">
              <img src={tourismImage} className="card-img-top" alt="Package" />
              <div className="card-body">
                <h5 className="card-title">{pack.package_name}</h5>
                <p className="card-text">Duration: {pack.package_days} days</p>
                <p className="card-text">Price: Rs.{pack.package_price}</p>
                {guideLoading ? (
                   <div className="text-center">
                   <DotLoader color="rgb(0, 0, 77)" loading={true} size={10} />
                 </div>
                ) : (<p className="card-text">Guide: {guideUsernames[pack.package_guide] || ""}</p>)}
                <NavLink to={`/updatepackdetails/${pack._id}`} className="btn btn-primary">
                  Update Package
                </NavLink>
              </div>
            </div>
          </div>
        )) : (<div className="container" style={{backgroundColor : "rgba(0, 0, 77, 0.9"}}><h1 style={{padding : "20px", color :"white"}}>No Packages Available.</h1></div>))}
      </div>
    </div>
  );
}
