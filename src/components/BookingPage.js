import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "./packageCard";
import BookPackCard from "./BookPackCard";

export default function BookingPage() {
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

    const handleButtonClick = () => {
        // Handle the button click action here
        // You can use package_name or other package details to perform an action
        console.log()  
    };

    return (
        <div>
            <div>
                {packages.map((pack) => (
                    <BookPackCard
                        key={pack._id}
                        package_name={pack.package_name}
                        package_days={pack.package_days}
                        package_price={pack.package_price}
                         // Use the guide username from state
                    />
                ))}
            </div>
        </div>
    );
}
