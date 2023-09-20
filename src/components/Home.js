import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./packageCard";

function Home() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [guideUsernames, setGuideUsernames] = useState({}); // Store guide usernames
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
  }

  const filteredPackages = packages.filter((pack) =>
  pack.package_name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div>
      <div className="centered-card">
      <div className="card">
        <input
          type="text"
          placeholder="Search packages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredPackages.map((pack) => (
          <PackageCard
            key={pack._id}
            idd={pack._id}
            package_name={pack.package_name}
            package_days={pack.package_days}
            package_price={pack.package_price}
            package_guide={guideUsernames[pack.package_guide] || ""}
            add="/bookingPage"
            task="View"
          />
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
