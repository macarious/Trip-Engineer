import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

// Custom hook to fetch and store travel plans
// travelPlans are fetched from the API and stored in state when the component mounts or when the accessToken changes
// travelPlans -- an array of travel plans
// setTravelPlans -- a function to set the travel plans
// saveNewTravelPlan -- a function to save a new travel plan to the database
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

    // Function to save a travel plan
    async function saveNewTravelPlan(newTravelPlan) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/travelplan`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTravelPlan),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Response not ok when saving travel plan");
            }
        })
        .then((data) => { 
            setTravelPlans([...travelPlans, data]);
            console.log("Saved", response);
        })
        .catch((error) => console.error("Save Travel Plan Failed:", error));
    };

    // Return the travel plans, setTravelPlans, and saveNewTravelPlan
    return { travelPlans, setTravelPlans, saveNewTravelPlan };
}
