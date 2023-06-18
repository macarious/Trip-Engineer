import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Button } from "react-bootstrap";

export default function Login() {
    const { loginWithRedirect } = useAuth0();
    const signUp = () => loginWithRedirect({ screen_hint: "signup" });

    return (
        <Container style={{ marginTop: '30vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <div className="d-grid gap-2">
                <Row>
                    Welcome to the Trip Engineer!
                </Row>
                <Row>
                    <Button variant="primary" className="w-100" onClick={loginWithRedirect} active>Login</Button>
                </Row>
                <Row>
                    <Button variant="primary" className="w-100" onClick={signUp} active>Create Account</Button>
                </Row>
            </div>
        </ Container>
    );
}