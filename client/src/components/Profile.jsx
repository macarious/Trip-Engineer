import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button, Card, Container, ListGroup, Row } from "react-bootstrap";

export default function Profile() {
  const { user, logout } = useAuth0();

    return (
        <Container style={{ marginTop: '5vh' }} className="d-flex flex-column align-items-center justify-content-center mt-3 mb-4">
            <div className="d-grid gap-2">
                <Row>
                    <Card
                        className="p-0 my-2 mx-auto"
                    >
                        <Card.Header className="text-center">Profile Information</Card.Header>
                        <Card.Img
                            src={user?.picture}
                            alt="Profile Image"
                            style={{ width: '200px', height: 'auto' }}
                            className="mx-auto my-2"
                        />
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><div className="mx-2">👤 Full Name: <strong>{user?.name}</strong></div></ListGroup.Item>
                            <ListGroup.Item><div className="mx-2">📧 Email Address: <strong>{user?.email}</strong></div></ListGroup.Item>
                            <ListGroup.Item><div className="mx-2">✔️ Email Verified: <strong>{(user?.email_verified)? "Yes" : "No"}</strong></div></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Row>
                <Row>
                    <Button
                        aria-label="View Your Saved Plans"
                        aria-describedby="Directs user to the Saved Plans page"
                        style={{ width: "200px" }}
                        className="mx-auto my-0"
                        as={Link}
                        to="/plan"
                    >
                        View Your Saved Plans
                    </Button>
                </Row>
                <Row>
                    <Button
                        variant="outline-primary"
                        aria-label="Log Out"
                        aria-describedby="Logs the user out of the application"
                        style={{ width: "200px", backgroundColor: "white"}}
                        className="mx-auto my-0"
                        as={Link}
                        to="/login"
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                        Log Out
                    </Button>
                </Row>
            </div>
        </ Container>
    );
}
  