import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar, } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import background from "../images/travel-items-white.jpg";

export default AppLayout;

function AppLayout() {
    const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
    
    return (
        <div>
            <div
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                    minHeight: "100vh",
                    opacity: "0.2",
                    sticky: "top",
                }}
            >
            </div>
            <div style={{ position: "absolute", top: "0", left: "0", width: "100%"}}>
                <Navbar
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    sticky="top"
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
                <div className="content d-flex flex-grow-1 mx-auto" style={{minHeight: "89vh", maxWidth: "1280px"}}>
                    <Outlet />
                </div>
                {/* Footer containing site information */}
                <Navbar
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    style={{ width: "100%" }}
                >
                    <Container className="">
                        <Nav>
                            <Nav.Link as={Link} to="/">&copy; 2023 Trip Engineer</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="https://www.northeastern.edu/" target="_blank">Northeastern University</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        </div>
    );
}