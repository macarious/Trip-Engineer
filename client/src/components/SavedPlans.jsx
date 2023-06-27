import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, CloseButton, Col, Container, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import useTravelNotes from "../hooks/useTravelNotes";
import useTravelPlans from "../hooks/useTravelPlans";
import TravelNoteForm from "./NoteForm";
import "../styles/savedPlans.css";

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
        } else {
            openEditNoteMode(planId);
        };
    };

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
        <Container className="content-saved-plans d-flex flex-column align-items-stretch mb-4">
            <div>
                <Row>
                    <h1 className="text-center">Your Saved Plans</h1>
                </Row>
                <Row xs={1} md={2} lg={3} className="d-flex mx-auto">
                {travelPlans.map((travelPlan, travelPlanIndex) => (
                    <Col key={"Plan" + travelPlanIndex}>
                        <Card className="mx-auto my-2 pb-2">
                            <Card.Body className="p-0">
                                <Card.Header><strong>Plan {travelPlanIndex + 1}: {travelPlan.location}</strong></Card.Header>
                                <Row>
                                    <Col className="d-flex justify-content-end mx-1 mt-2 px-0">
                                        Duration |
                                    </Col>
                                    <Col className="mx-1 px-0 fw-bold mt-2">
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
                                        Transportation |
                                    </Col>
                                    <Col className="mx-1 px-0 fw-bold">
                                        {travelPlan.hasCar ? "Car" : "Transit"}
                                    </Col>
                                </Row>
                                <hr className="my-3" />
                                <div className="d-flex flex-wrap align-items-start gap-0 mx-2 my-3">
                                    <>
                                    {(filterTravelNotesByPlan(travelPlan.id).map(travelNote => (
                                        <Badge
                                            bg="warning"
                                            className="m-1 fs-7 px-3 pt-1 pb-1 border border-dark rounded-pill"
                                            key={travelNote.id}
                                            style={{color: "black"}}
                                        >
                                            {`${travelNote.title + "  "}`}
                                            {(editNoteMode[travelPlan.id]) && (
                                            <CloseButton
                                                className="mx-0 bg-info p-0"
                                                aria-label="Remove tag from plan"
                                                aria-describedby={`Remove ${travelNote.title} tag from ${travelPlan.location}`}
                                                onClick={() => {
                                                    deleteTravelNoteFromPlan(travelNote.id);
                                                }}
                                            />
                                            )}
                                        </Badge>
                                    )))}
                                    </>
                                {(!editNoteMode[travelPlan.id])? (
                                    <div className="d-flex flex-wrap justify-content-end gap-2 mb-1">
                                        <Button
                                            variant="light"
                                            aria-label={`Edit tag for ${travelPlan.location}`}
                                            aria-describedby={`Add or delete a tag for ${travelPlan.location}`}
                                            as={Link}
                                            className="button-icon mx-1 p-0"
                                            onClick={() => {openEditNoteMode(travelPlan.id)}}
                                        >
                                            <span class="bi bi-pencil-fill"></span>
                                        </Button>
                                    </div>
                                ) : (
                                    <Row className="mx-0 flex-grow-1">
                                        <TravelNoteForm
                                            planId={travelPlan.id}
                                            callback={callbackFromNoteForm}
                                        />
                                    </Row>
                                )}
                                </div>
                                <hr className="my-3" />
                                <div className="d-flex flex-wrap justify-content-center gap-2 mb-1">
                                    <Button
                                        aria-label={`View Plan ${travelPlan.location}`}
                                        aria-describedby={`View the plan for ${travelPlan.location}`}
                                        as={Link}
                                        to={`/plan/${travelPlan.id}`}
                                        className="button-main-medium mx-1"
                                    >
                                        <span class="bi bi-eye"></span> View
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        aria-label={`Delete Plan ${travelPlan.location}`}
                                        aria-describedby={`Delete the plan for ${travelPlan.location}`}
                                        className="button-main-medium mx-1"
                                        onClick={() => deletePlan(travelPlan.id)}
                                    >
                                        <span class="bi bi-trash"></span> Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                    <Col key="Create New" className="align-self-stretch">
                        <Card className="mx-auto my-2 pb-2">
                            <Card.Body className="p-0">
                                <Card.Header><strong>Plan:</strong></Card.Header>
                                <div className="d-flex justify-content-center mt-3 mb-2">
                                    <Button
                                        aria-label="Create a New Plan"
                                        aria-describedby="Generates a new travel plan for the user"
                                        as={Link}
                                        to="/generator"
                                        className="button-main-medium"
                                        >
                                            Create
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}