import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Button } from "react-bootstrap";

export default function Login() {
    const { loginWithRedirect } = useAuth0();
    const signUp = () => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

    return (
        <Container style={{ marginTop: '30vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    <h5>Welcome to the Trip Engineer!</h5>
                </Row>
                <Row className="mx-auto">
                    <p>Please log in or create an account.</p>
                </Row>
                <Row>
                    <Button variant="primary" className="w-100" onClick={loginWithRedirect}>Login</Button>
                </Row>
                <Row>
                    <Button variant="primary" className="w-100" onClick={signUp}>Create Account</Button>
                </Row>
            </div>
        </ Container>
    );
}