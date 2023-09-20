import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./packageCard";

export default function Updatepackage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [guideUsernames, setGuideUsernames] = useState({}); // Store guide usernames

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

  return (
    <div>
      <div>
        {packages.map((pack) => (
          <PackageCard
            key={pack._id}
            idd = {pack._id}
            package_name={pack.package_name}
            package_days={pack.package_days}
            package_price={pack.package_price}
            package_guide={guideUsernames[pack.package_guide] || ""}
            add="/updatepackdetails" // Use the guide username from state
            task="Update"
          />
        ))}
      </div>
    </div>
  );
}
