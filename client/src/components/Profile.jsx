import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";

export default function Profile() {
    return (
        <Container style={{ marginTop: '30vh', marginBottom: "60px"}} className="d-flex flex-column align-items-center justify-content-center mt-3">
            <div className="d-grid gap-2">
                <Row>
                    <h1 className="text-center">Profile</h1>
                </Row>
                <Row>
                    <Button
                        as={Link}
                        to="/profile"
                        style={{ width: "200px" }}
                        className="mx-auto"
                        >
                            Return to Home
                    </Button>
                </Row>
            </div>
        </ Container>
    );
}
  