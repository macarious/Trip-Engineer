import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

// Custom hook to fetch and store travel notes
// travelNotes are fetched from the API and stored in state when the component mounts or when the accessToken changes
export default function useTravelNotesByNotes(planId) {
    const [travelNotesByPlan, setTravelNotesByPlan] = useState([]);
    const { accessToken } = useAuthToken();

    useEffect(() => {
        // Fetch the travel notes from the API endpoint
        async function getTravelNotesFromApi() {
            console.log("Fetching travel notes for planId: ", planId)
            await fetch(process.env.REACT_APP_API_URL + "/note/byId/" + planId, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    setTravelNotesByPlan(data);
                    console.log("Retrieved:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        // Only fetch travel plans if the user is authenticated
        if (accessToken) getTravelNotesFromApi();

    }, [accessToken, planId]);

    // Return the travel plans and setTravelPlans
    return [travelNotesByPlan, setTravelNotesByPlan];
}
