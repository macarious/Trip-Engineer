import { Link } from "react-router-dom";
import { Container, Row, Button, } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/home.css";

export default function Home() {
    const { user, logout } = useAuth0();

    return (
        <Container className="home-content d-flex flex-column align-items-center mb-4">
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
                        className="button-main mx-auto my-0"
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
                        className="button-main mx-auto my-0"
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
                        className="button-main mx-auto my-0"
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
                        className="button-main button-logout mx-auto my-0"
                        onClick={() => logout({ returnTo: window.location.origin })}
                    >
                        Log Out
                    </Button>
                </Row>
            </div>
        </Container>
    );
}