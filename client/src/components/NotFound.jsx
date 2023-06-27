import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import "../styles/notFound.css";

export default function NotFound() {
    return (
        <Container className="not-found-content d-flex flex-column align-items-center mb-4">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    404 Page Not Found
                </Row>
                <Row>
                    <Button
                        aria-label="Return to Home"
                        aria-describedby="Directs user back to the Home page"
                        as={Link}
                        to="/"
                        className="button-main my-2 mx-auto"
                        >
                            Return to Home
                    </Button>
                </Row>
            </div>
        </ Container>
    );
}