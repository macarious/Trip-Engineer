import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Row, Button, } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
    const { user, logout } = useAuth0();

    return (
        <Container style={{ marginTop: '30vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row>
                    {user?.name}
                </Row>
                <Row>
                    Ready for your next vacation?
                </Row>
                <Row>
                    <Button variant="primary" active as={Link} to="/SavedPlans">Saved Plans</Button>
                </Row>
                <Row>
                    <Button variant="primary" active as={Link} to="/TripGenerator">Trip Generator</Button>
                </Row>
                <Row>
                    <Button variant="primary" active as={Link} to="/Profile">Profile</Button>
                </Row>
                <Row>
                    <Button variant="primary-outline" active as={Link} to="/Login" onClick={() => logout({ returnTo: window.location.origin })}>
                        Log Out
                    </Button>
                </Row>
            </div>
        </Container>
    );
}