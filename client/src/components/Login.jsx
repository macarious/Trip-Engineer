import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Button } from "react-bootstrap";

export default function Login() {
    const { loginWithRedirect } = useAuth0();
    const signUp = () => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

    return (
        <Container style={{ marginTop: '30vh', marginBottom: "60px"}} className="d-flex flex-column mt-3">
            <div className="d-grid gap-2">
                <Row className="mx-auto">
                    <h5>Welcome to the Trip Engineer!</h5>
                </Row>
                <Row className="mx-auto">
                    <p>Please log in or create an account.</p>
                </Row>
                <Row>
                    <Button
                        aria-label="Log in"
                        aria-describedby="Log in to your account"
                        style={{ width: "200px" }}
                        className="mx-auto my-0"
                        onClick={loginWithRedirect}
                    >
                        Login
                    </Button>
                </Row>
                <Row>
                    <Button
                        aria-label="Log in"
                        aria-describedby="Log in to your account"
                        style={{ width: "200px" }}
                        className="mx-auto my-0"
                        onClick={signUp}
                    >
                        Create Account
                    </Button>
                </Row>
            </div>
        </ Container>
    );
}