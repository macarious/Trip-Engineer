import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/appLayout.css";

export default AppLayout;

function AppLayout() {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
    
    return (
        <>
            <div className="main">
                <Navbar
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    sticky="top"
                    nameClass="navbar"
                >
                    <Container>
                        <Navbar.Brand as={Link} to="/">Trip Engineer</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/generator" hidden={!isAuthenticated}>Create New Plan</Nav.Link>
                            <Nav.Link as={Link} to="/plan" hidden={!isAuthenticated}>Saved Plans</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={Link} to="/profile">{user?.name}</Nav.Link>
                                { !isAuthenticated ? (
                                    <Nav.Link onClick={loginWithRedirect}>Login</Nav.Link>
                                ) : (
                                    <Nav.Link onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="content d-flex flex-grow-1">
                    <Outlet />
                </div>
                <Navbar
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    nameClass="footer"
                >
                    <Container>
                        <Nav>
                            <Nav.Link as={Link} to="/">&copy; 2023 Trip Engineer</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="https://www.northeastern.edu/" target="_blank">Northeastern University</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}