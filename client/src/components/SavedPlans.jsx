import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, CloseButton, Col, Container, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import useTravelNotes from "../hooks/useTravelNotes";
import useTravelPlans from "../hooks/useTravelPlans";
import TravelNoteForm from "./NoteForm";

export default function SavedPlans() {

    const { accessToken } = useAuthToken();

    const [travelNotes, setTravelNotes] = useTravelNotes();
    const [travelPlans, setTravelPlans] = useTravelPlans();
    const [editNoteMode, setEditNoteMode] = useState({}); // Keeps track of which travel plan's add note mode is open
    
    useEffect(() => {
        const newAddNoteMode = {};

        travelPlans.forEach((travelPlan) => {
            // Update addNoteMode with object where key: planId, value: boolean
            newAddNoteMode[travelPlan.id] = false;
        });

        setEditNoteMode(newAddNoteMode);

    }, [accessToken, travelPlans]);

    // This function is passed to the NoteForm component as a callback
    function callbackFromNoteForm(planId, travelNote="") {
        if (travelNote) {
            const newTravelNotes = [...travelNotes];
            newTravelNotes.push(travelNote);
            setTravelNotes(newTravelNotes);
        }
        openEditNoteMode(planId);
    }

    // This function is a callback to open/close the edit note mode
    function openEditNoteMode(planId) {
        const newAddNoteMode = {...editNoteMode};
        newAddNoteMode[planId] = !newAddNoteMode[planId];
        setEditNoteMode(newAddNoteMode);
    };

    // This function deletes a travel note from the travel plan
    function deleteTravelNoteFromPlan(noteId) {
        // Delete the travel note from the API endpoint
        async function deleteTravelNoteFromApi() {
            await fetch(process.env.REACT_APP_API_URL + "/note/" + noteId, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                })
                .then((response) => {
                    response.json()
                    setTravelNotes([...travelNotes.filter((travelNote) => travelNote.id !== parseInt(noteId))])
                })
                .catch((error) => {
                    console.error("Error:", error);
            });
        };

        // Only delete travel note if the user is authenticated
        if (accessToken) deleteTravelNoteFromApi();
    };                  

    // This function deletes a travel plan from the database
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
                .then((response) => {
                    response.json()
                    setTravelPlans([...travelPlans.filter((travelPlan) => travelPlan.id !== parseInt(planId))])
                })
                .catch((error) => {
                    console.error("Error:", error);
            });
        };

        // Only delete travel plan if the user is authenticated
        if (accessToken) deleteTravelPlanFromApi();
    };

    // This function filters the travel notes by planId
    function filterTravelNotesByPlan(planId) {
        return travelNotes.filter((travelNote) => travelNote.travelPlanId === planId);
    };

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
                                <Card className="mx-auto my-2 pb-2">
                                    <Card.Body className="p-0">
                                        <Card.Header><strong>Plan {travelPlanIndex + 1}: {travelPlan.location}</strong></Card.Header>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Duration |
                                            </Col>
                                            <Col className="mx-1 px-0 fw-bold">
                                                {travelPlan.durationDays} days
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Arrival Time |
                                            </Col>
                                            <Col className="mx-1 px-0 fw-bold">
                                                {travelPlan.arrivalTime}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Departure Time |
                                            </Col>
                                            <Col className="mx-1 px-0 fw-bold">
                                                {travelPlan.departureTime}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-end mx-1 px-0">
                                                Car |
                                            </Col>
                                            <Col className="mx-1 px-0 fw-bold">
                                                {travelPlan.hasCar ? "Yes" : "No"}
                                            </Col>
                                        </Row>
                                        {(editNoteMode[travelPlan.id]) && (
                                            <div className="fw-bold mt-3 mb-0 mx-3"
                                                aria-label="Delete tag"
                                                aria-describedby={`Delete tag from ${travelPlan.location}`}
                                            >
                                            Delete Tag:
                                            </div>
                                        )}
                                        <div className="d-flex flex-wrap gap-0 mx-2">
                                        {(filterTravelNotesByPlan(travelPlan.id).map(travelNote => (
                                            <Badge
                                                bg="secondary"
                                                className="m-1 fs-7 px-3 pt-1 pb-1"
                                                key={travelNote.id}
                                            >
                                                {`${travelNote.title + "  "}`}
                                                {(editNoteMode[travelPlan.id]) && (
                                                <CloseButton
                                                    className="mx-0 bg-light p-0"
                                                    aria-label="Remove tag from plan"
                                                    aria-describedby={`Remove ${travelNote.title} tag from ${travelPlan.location}`}
                                                    onClick={() => {
                                                        deleteTravelNoteFromPlan(travelNote.id);
                                                    }}
                                                />
                                                )}
                                            </Badge>
                                        )))}
                                        </div>
                                        <hr className="my-1" />
                                        {(!editNoteMode[travelPlan.id])? (
                                            <div className="d-flex flex-wrap justify-content-center">
                                                <Button
                                                    aria-label={`View Plan ${travelPlan.location}`}
                                                    aria-describedby={`View the plan for ${travelPlan.location}`}
                                                    as={Link}
                                                    to={`/plan/${travelPlan.id}`}
                                                    style={{ width: "150px" }}
                                                    className="mx-2 my-1 p-0"
                                                >
                                                    View Plan
                                                </Button>
                                                <Button
                                                    aria-label={`Edit tag for ${travelPlan.location}`}
                                                    aria-describedby={`Add or delete a tag for ${travelPlan.location}`}
                                                    as={Link}
                                                    style={{ width: "150px" }}
                                                    className="mx-2 my-1 p-0"
                                                    onClick={() => {openEditNoteMode(travelPlan.id)}}
                                                >
                                                    Edit Tag
                                                </Button>
                                                <Button
                                                    variant="outline-danger"
                                                    aria-label={`Delete Plan ${travelPlan.location}`}
                                                    aria-describedby={`Delete the plan for ${travelPlan.location}`}
                                                    style={{ width: "150px" }}
                                                    className="mx-2 my-1 p-0"
                                                    onClick={() => deletePlan(travelPlan.id)}
                                                >
                                                    Delete Plan
                                                </Button>
                                            </div>
                                        ) : (
                                            <Row>
                                                <TravelNoteForm
                                                    planId={travelPlan.id}
                                                    callback={callbackFromNoteForm}
                                                />
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