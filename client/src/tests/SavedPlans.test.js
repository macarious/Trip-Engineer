import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SavedPlans from '../components/SavedPlans';

let mockIsAuthenticated = false;
const mockUseNavigate = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuthToken: jest.fn(),
    useAuth0: () => {
        return {
            isLoading: false,
            user: { sub: "dummy" },
            isAuthenticated: mockIsAuthenticated,
        };
    },
}));

jest.mock("../AuthTokenContext", () => ({
    useAuthToken: () => {
      return { accessToken: "dummyToken" };
    },
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => {
        return mockUseNavigate;
    },
}));

// Test if the text "Your Saved Plans" is rendered
test('renders the "Your Saved Plan" text', () => {
    mockIsAuthenticated = true;
    render(<SavedPlans />, { wrapper: MemoryRouter });
    const createText = screen.getByText("Your Saved Plans");
    expect(createText).toBeInTheDocument();
});

// Test if the text "Plan" is rendered
test('renders the "Plan" text', () => {
    mockIsAuthenticated = true;
    render(<SavedPlans />, { wrapper: MemoryRouter });
    const destinationText = screen.getByText("Plan");
    expect(destinationText).toBeInTheDocument();
});

// Test if the button "Create New Plan" is rendered
test('renders the "Create New Plan" button', () => {
    mockIsAuthenticated = true;
    render(<SavedPlans />, { wrapper: MemoryRouter });
    const durationText = screen.getByText("Create New Plan");
    expect(durationText).toBeInTheDocument();
});