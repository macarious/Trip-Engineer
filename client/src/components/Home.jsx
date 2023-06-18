import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Row, Button, } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { user, logout } = useAuth0();

    return (
        <Container style={{ marginTop: '30vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    <h5>{user?.name}</h5>
                </Row>
                <Row className="mx-auto">
                    <p>Are you ready for your next adventure?</p>
                </Row>
                <Row>
                    <Button variant="primary" active as={Link} to="/generator">Plan Generator</Button>
                </Row>
                <Row>
                    <Button variant="primary" active as={Link} to="/plans">Saved Plans</Button>
                </Row>
                <Row>
                    <Button variant="primary" active as={Link} to="/profile">Profile</Button>
                </Row>
                <Row>
                    <Button variant="outline" active as={Link} to="/login" onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </Button>
                </Row>
            </div>
        </Container>
    );
}