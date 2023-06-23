import React from 'react';
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export default function TravelPlanCardGroup(props) {
    const { travelPlan } = props;

    return (
        <Container>
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
        </Container>
    );
}