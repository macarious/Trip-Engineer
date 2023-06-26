import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";
import backToTop from "../util/backToTop";
import TravelPlanCardGroup from "./TravelPlanCardGroup";
import useTravelPlans from "../hooks/useTravelPlans";

// Add feature to delete plan
// Add feature to add notes

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
        <Container style={{ marginTop: "5vh"}} className="d-flex flex-column mb-4">
            {currentPlan? (
                <>
                    <Row>
                        <h1 className="text-center">{currentPlan.location}</h1>
                    </Row>
                    <Row>
                        <TravelPlanCardGroup schedule={currentPlan.schedule} />
                    </Row>
                    <Row>
                        <Container className="d-flex flex-wrap justify-content-center gap-3">
                            <Button
                                aria-label="Back to Top"
                                aria-describedby="Directs user back to the top of the page"
                                style={{ width: "200px" }}
                                onClick={backToTop}
                            >
                                Back to Top
                            </Button>
                            <Button
                                aria-label="Back to Saved Plans"
                                aria-describedby="Directs user back to the Saved Plans page"
                                as={Link}
                                to={"/plan"}
                                style={{ width: "200px" }}
                            >
                                Back to Saved Plans
                            </Button>
                            <Button
                                variant="outline-danger"
                                aria-label={`Delete plan: ${currentPlan.location}`}
                                aria-describedby={`Deletes the plan for ${currentPlan.location} from your saved plans`}
                                style={{ width: "200px", background: "white"}}
                                onClick={deletePlan}
                            >
                                Delete Plan
                            </Button>
                        </Container>
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