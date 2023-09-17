import React, { useEffect, useState } from "react";
import PlaceCard from "./placeCard";
 
export default function Updateguide() {

  const [places, setPlaces] = useState([]);

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
    };

    fetchData(); // Call the async function

    // Fetch guide usernames when the component mounts
  }, []);

 

  return (
    <div>
      <div>
        {places.map((place) => (
          <PlaceCard
            key={place._id}
            idd = {place._id}
            place_name={place.place_name}
            place_desc={place.place_desc}
            image={place.image}
            add="/updateplacedetails" // Use the guide username from state
          />
        ))}
      </div>
    </div>
  );
}
