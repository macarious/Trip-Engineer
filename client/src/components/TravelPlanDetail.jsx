import React, { useParams } from "react-router-dom";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import { useState, useEffect } from "react";
import TravelPlanCardGroup from "./TravelPlanCardGroup";

// Add feature to delete plan
// Add feature to add notes
// Add feature to link to generate more plans or see other saved plans

// This is the component that will display the travel plan details
export default function TravelPlanDetail() {
    const { planId } = useParams();
    const { accessToken } = useAuthToken();

    const [travelPlan, setTravelPlan] = useState([]);

    useEffect(() => {
        // Fetch the travel plan from the API endpoint
        async function getTravelPlanFromApi() {
            await fetch(process.env.REACT_APP_API_URL + "/plan/" + planId, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    setTravelPlan(data.plan);
                    console.log("Retrieved:", data.plan);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        // Only fetch travel plan if the user is authenticated
        console.log(planId);
        if (accessToken) getTravelPlanFromApi();

    }, [accessToken, planId]);

    return (
        <Container style={{ maxWidth: '1024px' }} className="d-flex flex-column my-3">
            <Row>
                <h1 className="text-center">Plan Generator</h1>
            </Row>
            <Row>
                <TravelPlanCardGroup travelPlan={travelPlan} />
            </Row>
        </Container>
    );
}