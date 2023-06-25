import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import useTravelPlans from "../hooks/useTravelPlans";
import TravelNoteForm from "./NoteForm";

export default function SavedPlans() {

    const { accessToken } = useAuthToken();

    const [travelPlans, setTravelPlans] = useTravelPlans();
    const [addNoteMode, setAddNoteMode] = useState({});

    // Update addNoteMode with object: key: planId, value: boolean
    useEffect(() => {
        const newAddNoteMode = {};
        travelPlans.forEach((travelPlan) => {
            newAddNoteMode[travelPlan.id] = false;
        });
        setAddNoteMode(newAddNoteMode);
    }, [travelPlans]);

    function openAddNoteMode(planId) {
        const newAddNoteMode = {...addNoteMode};
        newAddNoteMode[planId] = !newAddNoteMode[planId];
        setAddNoteMode(newAddNoteMode);
        console.log("addNoteMode: ", addNoteMode);
    };

    async function deletePlan(planId) {
        // Delete the travel plan from the API endpoint
        async function deleteTravelPlanFromApi() {
            await fetch(process.env.REACT_APP_API_URL + "/plan/" + planId, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    setTravelPlans([...travelPlans.filter((travelPlan) => travelPlan.id !== parseInt(planId))]);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        // Only delete travel plan if the user is authenticated
        if (accessToken) deleteTravelPlanFromApi();
    }     

    return (
        <Container style={{ maxWidth: '1024px', "marginBottom": "60px" }} className="d-flex flex-column mt-3">
            <div>
                <Row>
                    <h1 className="text-center">Your Saved Plans</h1>
                </Row>
                {(travelPlans.length > 0)? (
                    <Row xs={1} md={2} lg={3} className="d-flex mt-2 mb-5 mx-auto">
                        {travelPlans.map((travelPlan, travelPlanIndex) => (
                            <Col key={"Plan" + travelPlanIndex}>
                                <Card className="mx-auto my-1">
                                    <Card.Body className="p-0">
                                        <Card.Header><strong>Plan {travelPlanIndex + 1}: {travelPlan.location}</strong></Card.Header>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Duration |
                                            </Col>
                                            <Col className="mx-1 px-0">
                                                {travelPlan.durationDays} days
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Arrival Time |
                                            </Col>
                                            <Col className="mx-1 px-0">
                                                {travelPlan.arrivalTime}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Departure Time |
                                            </Col>
                                            <Col className="mx-1 px-0">
                                                {travelPlan.departureTime}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Car |
                                            </Col>
                                            <Col className="mx-1 px-0">
                                                {travelPlan.hasCar ? "Yes" : "No"}
                                            </Col>
                                        </Row>
                                        {(!addNoteMode[travelPlan.id])? (
                                            <>
                                                <p>{`${addNoteMode[travelPlan.id]}`}</p>
                                                <Row>
                                                    <Button
                                                        aria-label={`View Plan ${travelPlan.location}`}
                                                        aria-describedby={`View the plan for ${travelPlan.location}`}
                                                        as={Link}
                                                        to={`/plan/${travelPlan.id}`}
                                                        style={{ width: "150px" }}
                                                        className="mx-auto my-1"
                                                    >
                                                        View Plan
                                                    </Button>
                                                </Row>
                                                <Row>
                                                    <Button
                                                        aria-label={`Add note to Plan ${travelPlan.location}`}
                                                        aria-describedby={`Add a note to the plan for ${travelPlan.location}`}
                                                        as={Link}
                                                        style={{ width: "150px" }}
                                                        className="mx-auto my-1"
                                                        onClick={() => {openAddNoteMode(travelPlan.id)}}
                                                    >
                                                        Add Note
                                                    </Button>
                                                </Row>
                                                <Row>
                                                    <Button
                                                        variant="outline-danger"
                                                        aria-label={`Delete Plan ${travelPlan.location}`}
                                                        aria-describedby={`Delete the plan for ${travelPlan.location}`}
                                                        style={{ width: "150px" }}
                                                        className="mx-auto my-1"
                                                        onClick={() => deletePlan(travelPlan.id)}
                                                    >
                                                        Delete Plan
                                                    </Button>
                                                </Row>
                                            </>
                                        ) : (
                                            <Row>
                                                <TravelNoteForm planId={travelPlan.id} callback={openAddNoteMode} />
                                            </Row>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Row>
                        <p className="text-center">There are currently no plans.</p>
                        <Button
                            variant="primary"
                            active
                            as={Link}
                            to="/generator"
                            style={{ width: "200px" }}
                            className="mx-auto"
                            >
                                Create a New Plan
                        </Button>
                    </Row>
                )}
            </div>
        </ Container>
    );
}