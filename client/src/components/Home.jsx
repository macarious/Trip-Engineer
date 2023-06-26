import { Link } from "react-router-dom";
import { Container, Row, Button, } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { user, logout } = useAuth0();

    return (
        <Container style={{ marginTop: '10vh'}} className="d-flex flex-column align-items-center mb-4">
            <div className="d-grid gap-3">
                <Row className="text-center">
                    <p>
                        <strong>{user?.name}</strong>
                        <br />
                        Are you ready for your next adventure?
                    </p>
                </Row>
                <Row>
                    <Button
                        aria-label="Create a New Plan"
                        aria-describedby="Generates a new travel plan for the user"
                        style={{ width: "200px" }}
                        className="mx-auto my-0"
                        as={Link}
                        to="/generator"
                        >
                            Create a New Plan
                        </Button>
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
                        aria-label="Profile"
                        aria-describedby="Directs user to the Profile page"
                        style={{ width: "200px" }}
                        className="mx-auto my-0"
                        as={Link}
                        to="/profile"
                    >
                        Profile
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
        </Container>
    );
}