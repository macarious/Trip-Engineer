import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../components/Home';

let mockIsAuthenticated = false;
const mockLoginWithRedirect = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => {
        return {
            isLoading: false,
            user: { sub: "dummy" },
            isAuthenticated: mockIsAuthenticated,
            loginWithRedirect: mockLoginWithRedirect,
        };
    },
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => {
        return mockUseNavigate;
    },
}));

// Test if the buttons "Create a New Plan" is rendered if user is logged in
test('renders the "Create a New Plan" button', () => {
    mockIsAuthenticated = true;
    render(<Home />, { wrapper: MemoryRouter });
    const createButton = screen.getByText("Create a New Plan");
    expect(createButton).toBeInTheDocument();
});

// Test if the buttons "View Your Saved Plans" is rendered if user is logged in
test('renders the "View Your Saved Plans" button', () => {
    mockIsAuthenticated = true;
    render(<Home />, { wrapper: MemoryRouter });
    const viewButton = screen.getByText("View Your Saved Plans");
    expect(viewButton).toBeInTheDocument();
});

// Test if the buttons "Profile" is rendered if user is logged in
test('renders the "Profile" button', () => {
    mockIsAuthenticated = true;
    render(<Home />, { wrapper: MemoryRouter });
    const profileButton = screen.getByText("Profile");
    expect(profileButton).toBeInTheDocument();
});

// Test if the "Log Out" button is rendered if user is logged in
test('renders the "Log Out" button', () => {
    mockIsAuthenticated = true;
    render(<Home />, { wrapper: MemoryRouter });
    const logoutButton = screen.getByText("Log Out");
    expect(logoutButton).toBeInTheDocument();
});


