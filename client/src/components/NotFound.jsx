import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";

export default function NotFound() {
    return (
        <Container style={{ marginTop: '30vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    404 Page Not Found
                </Row>
                <Row>
                    <Button as={Link} to="/" variant="primary" className="w-100" active>Return to Home</Button>
                </Row>
            </div>
        </ Container>
    );
}