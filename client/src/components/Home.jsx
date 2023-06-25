import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Row, Button, } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { user, logout } = useAuth0();

    return (
        <Container style={{ marginTop: '10vh', marginBottom: "60px"}} className="d-flex flex-column align-items-center mt-3">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    <h5>{user?.name}</h5>
                </Row>
                <Row className="mx-auto">
                    <p>Are you ready for your next adventure?</p>
                </Row>
                <Row>
                    <Button
                        aria-label="Create a New Plan"
                        aria-describedby="Directs user to the Plan Generator page"
                        active
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
                        active
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
                        active
                        as={Link}
                        to="/profile"
                    >
                        Profile
                    </Button>
                </Row>
                <Row>
                    <Button
                        variant="outline"
                        aria-label="Log Out"
                        aria-describedby="Logs the user out of the application"
                        active
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