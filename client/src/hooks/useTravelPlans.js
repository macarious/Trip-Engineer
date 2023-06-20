import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useTravelPlans() {
    const [travelPlans, setTravelPlans] = useState([]);
    const { accessToken } = useAuthToken();

    useEffect(() => {
        // Fetch the travel plans from the API
        async function getTravelPlansFromApi() {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/travelplan`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        
        // Convert the response to JSON
        const todos = await data.json();

        // Store the travel plans in state
        setTravelPlans(todos);
        }

        // Only fetch travel plans if the user is authenticated
        if (accessToken) {
            getTravelPlansFromApi();
        }
        
    }, [accessToken]);

    // Return the travel plans and a function to update them
    return [travelPlans, setTravelPlans];
}
