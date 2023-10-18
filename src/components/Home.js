import React, { useContext, useEffect, useState } from "react";
import PackageCard from "./packageCard";
import tourismImage from '../images/backgroundImg.jpg';
import '../styles/demoHome.css';

function Home() {
  const [packages, setPackages] = useState([]);
  const [guideUsernames, setGuideUsernames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

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
    };

    fetchData();
    fetchGuideUsernames();
  }, []);

  async function fetchGuideUsernames() {
    try {
      const response = await fetch("http://localhost:5000/guideUsernames");
      if (response.ok) {
        const data = await response.json();
        setGuideUsernames(data);
      } else {
        console.error("Error fetching guide usernames:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching guide usernames:", error);
    }
  }

  const filteredPackages = packages.filter((pack) =>
    pack.package_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="centered-card">
      <div className="card">
      <div className="search-container">
      <span className="icon bi bi-search"></span>
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-field"
          />
       </div>

        <div className="row row-cols-1 row-cols-md-4 g-4" style={{ backgroundImage: `url(${tourismImage})`, backgroundPosition: "center", backgroundSize: 'cover' }}>
          {filteredPackages.map((pack) => (
            <div className="col" key={pack._id}>
              <PackageCard
                idd={pack._id}
                package_name={pack.package_name}
                package_days={pack.package_days}
                package_price={pack.package_price}
                package_guide={guideUsernames[pack.package_guide] || ""}
                add="/bookingPage"
                task="View"
              />
            </div>
          ))}
        </div>
        
        
      </div>
    </div>
  );
}

export default Home;