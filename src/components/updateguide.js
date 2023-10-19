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

    fetchData();
  }, []);

 

  return (
    <div>
      <div>
        {loading ? (
           <div className="text-center justify-content-center">
           <DotLoader color="rgb(0, 0, 77)" loading={true} size={50} />
         </div>
          ) : (guides.length > 0 ? (
          guides.map((guide) => (
          <GuideCard
            key={guide._id}
            idd = {guide._id}
            firstname={guide.firstname}
            lastname={guide.lastname}
            email={guide.email}
            username={guide.username}
            mobilenumber={guide.mobilenumber}
            add="/updateguidedetails"
          />
        ))) : <div className="container" style={{backgroundColor : "rgba(0, 0, 77, 0.9"}}><h1 style={{padding : "20px", color :"white"}}>No Guides Available.</h1></div>)}
      </div>
    </div>
  );
}
