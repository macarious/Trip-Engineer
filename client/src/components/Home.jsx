import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Button } from "react-bootstrap";

export default function Home() {

    return (
        <Container style={{ marginTop: '30vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row>
                    Welcome to the Trip Engineer!
                </Row>
                <Row>
                    <Button variant="primary" className="w-100" active>Login</Button>
                </Row>
                <Row>
                    <Button variant="primary" className="" active>Create Account</Button>
                </Row>
            </div>
        </ Container>
    );
}