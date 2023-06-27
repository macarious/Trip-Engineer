import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

let mockIsAuthenticated = false;
const mockLoginWithRedirect = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => {
        return {
            isLoading: false,
            user: { sub: "foobar" },
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

// Test if the buttons "Create a New Plan", "View Your Saved Plans", "Profile", and "Log Out" are rendered if user is logged in
test('renders the buttons', () => {
    mockIsAuthenticated = true;
    render(<Home />, { wrapper: MemoryRouter });
    const createButton = screen.getByText("Create a New Plan");
    const viewButton = screen.getByText("View Your Saved Plans");
    const profileButton = screen.getByText("Profile");
    const logoutButton = screen.getByText("Log Out");
    expect(createButton).toBeInTheDocument();
    expect(viewButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
});

// Test if user is redirected to /login if user is not logged in
test('redirects to /login', () => {
    mockIsAuthenticated = false;
    render(<Home />, { wrapper: MemoryRouter });
    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
});

// Test if user is redirected to /generator if user clicks on "Create a New Plan" button and is logged in
test('redirects to /generator', async () => {
    mockIsAuthenticated = true;
    render(<Home />, { wrapper: MemoryRouter });
    const createButton = screen.getByText("Create a New Plan");
    await userEvent.click(createButton);
    expect(mockUseNavigate).toHaveBeenCalledWith("/generator");
});
