import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "../UserContext";
import { Outlet, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';

export default AppLayout;

function AppLayout() {
    const { user, setUser } = useUser();
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Trip Engineer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/TripGenerator">Trip Generator</Nav.Link>
                    <Nav.Link as={Link} to="/SavedPlans">Saved Plans</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/Profile">{user?.name}</Nav.Link>
                    {user ? (
                        <Nav.Link onClick={() => setUser(null)} as={Link} to="/">
                            Log Out
                        </Nav.Link>
                    ) : (
                        <Nav.Link as={Link} to="/">
                            Log In
                        </Nav.Link>
                    )}
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