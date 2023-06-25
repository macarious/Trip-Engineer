import React from 'react';
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

// This component is used to display the schedule in a card group format
export default function TravelPlanCardGroup(props) {
    const { schedule } = props;

    return (
        <Container>
            {schedule && (
                <Row xs={1} className="d-flex mb-1">
                    {schedule.map((dayActivities, dayIndex) => (
                        <Col key={"Day" + dayIndex}>
                            <Card className="m-1">
                                <Card.Body className="p-0">
                                    <Card.Header>Day {dayIndex + 1}</Card.Header>
                                    <ListGroup variant="flush">
                                        {dayActivities.map((activity) => (
                                            <ListGroup.Item key={dayIndex + activity.timeOfDay}>
                                                <strong>{activity.timeOfDay + " | " + activity.activityName}</strong>
                                                <br />
                                                {activity.description}
                                                <br />
                                                <a
                                                    href={"https://maps.google.com/?q=" + encodeURIComponent(activity.activityName + "; " + activity.address).replace(/%20/g, '+')}
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