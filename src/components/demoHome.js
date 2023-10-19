import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import tourismImage from "../images/backgroundImg.jpg";
import "../styles/demoHome.css";
import { PulseLoader as DotLoader } from "react-spinners";
import { GlobalContext } from '../App';

function Home() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(true);
  const { isLoggedIn, setisLoggedIn, isAdmin, setisAdmin } = useContext(GlobalContext);


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
      finally {
        setloading(false);
      }
    };

    fetchData();
  }, []);


  const filteredPackages = packages.filter((pack) =>
    pack.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-xxl py-5">
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search packages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      { loading ? (
         <div className="text-center justify-content-center">
         <DotLoader color="rgb(0, 0, 77)" loading={true} size={50} />
       </div>
      ) : 
        <div className="container">
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {filteredPackages.map((pack) => (
              <div className="col" key={pack._id}>
                <div className="card mb-4">
                  <img src={pack.img_url} className="card-img-top" alt="Package" />
                  <div className="card-body">
                    <h5 className="card-title">{pack.package_name}</h5>
                    <p className="card-text">Duration: {pack.package_days} days</p>
                    <p className="card-text">Price: Rs.{pack.package_price}</p>
                    {isAdmin ? (<NavLink to={`/bookingPage/${pack._id}`} className="btn btn-primary">
                      Add Dates
                    </NavLink>) : (<NavLink to={`/bookingPage/${pack._id}`} className="btn btn-primary">
                      Book now
                    </NavLink>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}

export default Home;
