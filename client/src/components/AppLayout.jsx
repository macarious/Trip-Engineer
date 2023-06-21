import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

export default AppLayout;

function AppLayout() {
    const { isAuthenticated, user, logout } = useAuth0();
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Trip Engineer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                        <Nav.Link as={Link} to="/generator">Plan Generator</Nav.Link>
                        <Nav.Link as={Link} to="/plan">Saved Plans</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/profile">{user?.name}</Nav.Link>
                    { !isAuthenticated ? (
                        <Nav.Link as={Link} to="/verify-user">Login</Nav.Link>
                    ) : (
                        <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Nav.Link>
                    )
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div className="content">
                {/* https://reactrouter.com/en/main/components/outlet */}
                <Outlet />
            </div>
        </div>
    );
}