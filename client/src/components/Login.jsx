import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Button } from "react-bootstrap";
import "../styles/login.css";

export default function Login() {
    const { loginWithRedirect } = useAuth0();
    const signUp = () => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

    return (
        <Container className="login-content d-flex flex-column align-items-center mb-4">
        <div className="d-grid gap-3">
                <Row className="mx-auto">
                    <h5>Welcome to Trip Engineer!</h5>
                </Row>
                <Row className="mx-auto">
                    <p>Please log in or create an account.</p>
                </Row>
                <Row>
                    <Button
                        aria-label="Log in"
                        aria-describedby="Log in to your account"
                        className="button-main mx-auto my-0"
                        onClick={loginWithRedirect}
                    >
                        Login
                    </Button>
                </Row>
                <Row>
                    <Button
                        aria-label="Log in"
                        aria-describedby="Log in to your account"
                        className="button-main mx-auto my-0"
                        onClick={signUp}
                    >
                        Create Account
                    </Button>
                </Row>
            </div>
        </ Container>
    );
}