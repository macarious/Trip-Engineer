import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Image, ListGroup, Row } from "react-bootstrap";

export default function Profile() {
  const { user } = useAuth0();

    return (
        <Container style={{ marginTop: '30vh', marginBottom: "60px"}} className="d-flex flex-column align-items-center justify-content-center mt-3">
            <div className="d-grid gap-2">
                <Row>
                    <h1 className="text-center">Profile</h1>
                </Row>
                <Row>
                    <Image
                        src={user?.picture}
                        alt="Profile Image"
                        style={{ width: '200px', height: 'auto' }}
                        className="mx-auto"
                        rounded
                    />
                </Row>
                <Row>
                    <Card
                        className="p-0 my-2 mx-auto" style={{ minWidth: '250px' }}
                    >
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><div className="mx-1">{user?.name}</div></ListGroup.Item>
                            <ListGroup.Item><div className="mx-1">{user?.email}</div></ListGroup.Item>
                            <ListGroup.Item><div className="mx-1">{(user?.email_verified)? "Email Verified" : "Email Not Verified"}</div></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Row>
                <Row>
                    <Button
                        as={Link}
                        to="/"
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
  