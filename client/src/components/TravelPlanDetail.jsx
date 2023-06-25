import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button, Container, Nav, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";
import TravelPlanCardGroup from "./TravelPlanCardGroup";
import useTravelPlans from "../hooks/useTravelPlans";

// Add feature to delete plan
// Add feature to add notes
// Add feature to link to generate more plans or see other saved plans

// This is the component that will display the travel plan details
export default function TravelPlanDetail() {

    const { planId } = useParams();
    const { accessToken } = useAuthToken();

    const [travelPlans, setTravelPlans] = useTravelPlans();
    const [currentPlan, setCurrentPlan] = useState(null);

    useEffect(() => {
        if (accessToken) {
            setCurrentPlan(travelPlans.find((travelPlan) => travelPlan.id === parseInt(planId)));
        }

    }, [accessToken, planId, travelPlans]);

    async function deletePlan() {
        // Delete the travel plan from the API endpoint
        async function deleteTravelPlanFromApi() {
            await fetch(process.env.REACT_APP_API_URL + "/plan/" + planId, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                })
                .then((response) => {
                    response.json();
                    setTravelPlans([...travelPlans.filter((travelPlan) => travelPlan.id !== parseInt(planId))]);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };


        // Only delete travel plan if the user is authenticated
        if (accessToken) {
            deleteTravelPlanFromApi()
            return <Navigate to="/plan" />;
        };
    }   
    
    return (
        <Container style={{ maxWidth: '1024px', marginBottom: "60px"}} className="d-flex flex-column mt-3">
            {currentPlan? (
                <>
                    <Row>
                        <h1 className="text-center">{currentPlan.location}</h1>
                    </Row>
                    <Row>
                        <TravelPlanCardGroup schedule={currentPlan.schedule} />
                    </Row>
                    <Row>
                        <Button
                            aria-label="Back to Saved Plans"
                            aria-describedby="Directs user back to the Saved Plans page"
                            as={Link}
                            to={"/plan"}
                            style={{ width: "200px" }}
                            className="my-2 mx-auto"
                        >
                            Back to Saved Plans
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            variant="outline-danger"
                            aria-label={`Delete plan: ${currentPlan.location}`}
                            aria-describedby={`Deletes the plan for ${currentPlan.location} from your saved plans`}
                            style={{ width: "200px" }}
                            className="mx-auto"
                            onClick={deletePlan}
                        >
                            Delete Plan
                        </Button>
                    </Row>
                </>
            ) : (
                <Row>
                    <p className="text-center">Plan not found.</p>
                    <Button
                        variant="primary"
                        aria-label="Return to Home"
                        aria-describedby="Directs user back to the Home page"
                        as={Link}
                        to="/"
                        style={{ width: "200px" }}
                        className="my-2 mx-auto"
                        >
                            Return to Home
                    </Button>
                </Row>
            )}
        </Container>
    );
}