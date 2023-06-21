import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

// Custom hook to fetch and store travel plans
export default function useTravelPlans() {
    const [travelPlans, setTravelPlans] = useState([]);
    const { accessToken } = useAuthToken();

    useEffect(() => {
        // Fetch the travel plans from the API
        async function getTravelPlansFromApi() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/travelplan`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const fetchedTravelPlans = await response.json();
                    setTravelPlans(fetchedTravelPlans);
                } else {
                    console.error("Failed to fetch travel plans");
                }
            } catch (error) {
                console.error("Error fetching travel plans:", error);
            }
        }

        // Only fetch travel plans if the user is authenticated
        if (accessToken) {
            getTravelPlansFromApi();
        }
    }, [accessToken]);

    // Function to save a travel plan
    const saveTravelPlan = async (newTravelPlan) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/travelplan`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTravelPlan),
            });

            if (response.ok) {
                const savedTravelPlan = await response.json();
                setTravelPlans([...travelPlans, savedTravelPlan]);
            } else {
                console.error("Failed to save travel plan");
            }
        } catch (error) {
            console.error("Error saving travel plan:", error);
        }
    };

    // Return the travel plans, setTravelPlans, and saveTravelPlan together
    return { travelPlans, setTravelPlans, saveTravelPlan };
}
