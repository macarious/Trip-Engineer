import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

// Custom hook to fetch and store travel plans
// travelPlans are fetched from the API and stored in state when the component mounts or when the accessToken changes
// travelPlans -- an array of travel plans
// setTravelPlans -- a function to set the travel plans
export default function useTravelPlans() {
    const [travelPlans, setTravelPlans] = useState([]);
    const { accessToken } = useAuthToken();

    useEffect(() => {
        // Fetch the travel plans from the API
        async function getTravelPlansFromApi() {
            await fetch(process.env.REACT_APP_API_URL + "/plan", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    setTravelPlans(data);
                    console.log("Retrieved:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        // Only fetch travel plans if the user is authenticated
        if (accessToken) getTravelPlansFromApi();

    }, [accessToken]);

    // Return the travel plans, setTravelPlans, and saveNewTravelPlan
    return [travelPlans, setTravelPlans];
}
