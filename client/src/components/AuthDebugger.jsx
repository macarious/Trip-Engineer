import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { Container } from "react-bootstrap";

export default function AuthDebugger() {
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();

    return (
        <Container style={{ marginTop: '10vh'}} className="d-flex flex-column justify-content-left mb-4">
            <div className="m-3">
                <div>
                    <p>Access Token:</p>
                    <pre className="text-wrap">{JSON.stringify(accessToken, null, 2)}</pre>
                </div>
                <div>
                    <p>User Info:</p>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            </div>
        </ Container>
    );
}