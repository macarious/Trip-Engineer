import { Link } from "react-router-dom";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useAuthToken } from "../AuthTokenContext";
import useTravelPlans from "../hooks/useTravelPlans";

export default function SavedPlans() {

    const { accessToken } = useAuthToken();
    const [travelPlans, setTravelPlans] = useTravelPlans();

    // Add delete plan functionality

    return (
        <Container style={{ maxWidth: '1024px' }} className="d-flex my-3">
            <div>
                <Row>
                    <h1 className="text-center">Saved Plans</h1>
                </Row>
                {travelPlans && (
                    <Row xs={1} md={2} lg={3} className="d-flex mt-2 mb-5 mx-auto">
                        {travelPlans.map((travelPlan, travelPlanIndex) => (
                            <Col>
                                <Card className="mx-auto my-1">
                                    <Card.Body className="p-0">
                                        <Card.Header><strong>Plan {travelPlanIndex + 1}: {travelPlan.location}</strong></Card.Header>
                                        <Row>
                                            <Col className="m-1 d-flex justify-content-end">
                                                Duration |
                                            </Col>
                                            <Col className="m-1">
                                                {travelPlan.durationDays} days
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="m-1 d-flex justify-content-end">
                                                Arrival Time |
                                            </Col>
                                            <Col className="m-1">
                                                {travelPlan.arrivalTime}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="m-1 d-flex justify-content-end">
                                                Departure Time |
                                            </Col>
                                            <Col className="m-1">
                                                {travelPlan.departureTime}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col className="m-1 d-flex justify-content-end">
                                                Car |
                                            </Col>
                                            <Col className="m-1">
                                                {travelPlan.hasCar ? "Yes" : "No"}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Button
                                                aria-label="View Plan {travelPlanIndex + 1} {travelPlan.location}"
                                                aria-describedby="View the plan for {travelPlan.location}"
                                                as={Link}
                                                to={`/plan/${travelPlan.id}`}
                                                className="w-25 mx-auto m-2"
                                                size="sm"
                                            >
                                                View Plan
                                            </Button>
                                        </Row>
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
  