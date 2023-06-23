import { useParams } from "react-router-dom";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import { useState, useEffect } from "react";

// Add feature to delete plan
// Add feature to add notes
// Add feature to link to generate more plans or see other saved plans

// This is the component that will display the travel plan details
export default function TravelPlanDetail() {
    const { planId } = useParams();
    const [travelPlan, setTravelPlan] = useState([]);
    const { accessToken } = useAuthToken();

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
        <Container style={{ maxWidth: '1024px' }} className="d-flex my-3">
            <div>
                <Row>
                    <h1 className="text-center">{travelPlan.location}</h1>
                </Row>
                {travelPlan && (
                <Row xs={1} className="d-flex mb-5">
                    {travelPlan.map((dayActivities, dayIndex) => (
                        <Col>
                            <Card className="m-1">
                                <Card.Body className="p-0">
                                    <Card.Header>Day {dayIndex + 1}</Card.Header>
                                    <ListGroup variant="flush">
                                        {dayActivities.map((activity) => (
                                            <ListGroup.Item>
                                                <strong>{activity.timeOfDay + " | " + activity.activityName}</strong>
                                                <br />
                                                {activity.description}
                                                <br />
                                                <a
                                                    href={"https://maps.google.com/?q=" + encodeURIComponent(activity.address).replace(/%20/g, '+')}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <small>{activity.address}</small>
                                                </a>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                )}
            </div>
        </ Container>
    );
}