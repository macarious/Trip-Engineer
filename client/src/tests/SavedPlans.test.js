import { render, screen } from '@testing-library/react';
import SavedPlans from '../components/SavedPlans';
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
    }
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => {
        return mockUseNavigate;
    }
}));

test('renders the cards', () => {
    mockIsAuthenticated = true;
    render(<SavedPlans />, { wrapper: MemoryRouter });
    const cards = screen.getByTestId("cards");
    expect(cards).toBeInTheDocument();
}
);

// Test if user is redirected to /login if user is not logged in
test('redirects to /login', () => {
    mockIsAuthenticated = false;
    render(<SavedPlans />, { wrapper: MemoryRouter });
    expect(mockUseNavigate).toHaveBeenCalledWith("/login");
}
);

// Test if user is redirected to /generator if user clicks on "Create a New Plan" button and is logged in
test('redirects to /generator', async () => {
    mockIsAuthenticated = true;
    render(<SavedPlans />, { wrapper: MemoryRouter });
    const createButton = screen.getByText("Create a New Plan");
    await userEvent.click(createButton);
    expect(mockUseNavigate).toHaveBeenCalledWith("/generator");
}
);

