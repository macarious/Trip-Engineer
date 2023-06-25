import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

export default AppLayout;

function AppLayout() {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Trip Engineer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                        <Nav.Link as={Link} to="/generator" hidden={!isAuthenticated}>Create a New Plan</Nav.Link>
                        <Nav.Link as={Link} to="/plan" hidden={!isAuthenticated}>View Your Saved Plans</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/profile">{user?.name}</Nav.Link>
                    { !isAuthenticated ? (
                        <Nav.Link onClick={loginWithRedirect}>Login</Nav.Link>
                    ) : (
                        <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Nav.Link>
                    )
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div className="content">
                <Outlet />
            </div>
            {/* Footer containing site information */}
            <Navbar expand="lg" bg="dark" variant="dark" style={{left: 0, bottom: 0, width: "100%"}}>
            <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">&copy; 2021 Trip Engineer</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}