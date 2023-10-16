import React, { useEffect, useState } from "react";
import GuideCard from "./guidecard";
import {PulseLoader as DotLoader} from "react-spinners";
export default function Updateguide() {

  const [guides, setGuide] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/guides");
        if (response.ok) {
          const data = await response.json();
          setGuide(data);
        } else {
          console.error("Error fetching places:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
      finally{
        setloading(false);
      }
    };

    fetchData(); // Call the async function

    // Fetch guide usernames when the component mounts
  }, []);

 

  return (
    <div>
      <div>
        {loading ? (
           <div className="text-center justify-content-center">
           <DotLoader color="rgb(0, 0, 77)" loading={true} size={50} />
         </div>
          ) : 
          guides.map((guide) => (
          <GuideCard
            key={guide._id}
            idd = {guide._id}
            firstname={guide.firstname}
            lastname={guide.lastname}
            email={guide.email}
            username={guide.username}
            mobilenumber={guide.mobilenumber}
            add="/updateguidedetails" // Use the guide username from state
          />
        ))}
      </div>
    </div>
  );
}
