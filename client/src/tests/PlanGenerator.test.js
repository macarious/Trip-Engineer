import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlanGenerator from '../components/PlanGenerator';

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

// Test if the text "Crate a New Plan" is rendered
test('renders the "Create a New Plan" text', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const createText = screen.getByText("Create a New Plan");
    expect(createText).toBeInTheDocument();
});

// Test if the text "Destination" is rendered
test('renders the "Destination" text', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const destinationText = screen.getByText("Destination");
    expect(destinationText).toBeInTheDocument();
});

// Test if the text "Duration (in days)" is rendered
test('renders the "Duration (in days)" text', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const durationText = screen.getByText("Duration (in days)");
    expect(durationText).toBeInTheDocument();
});

// Test if the text "Arrival Time" is rendered
test('renders the "Arrival Time" text', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const arrivalText = screen.getByText("Arrival Time");
    expect(arrivalText).toBeInTheDocument();
});

// Test if the text "Departure Time" is rendered
test('renders the "Departure Time" text', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const departureText = screen.getByText("Departure Time");
    expect(departureText).toBeInTheDocument();
});

// Test if the text "Transportation Mode" is rendered
test('renders the "Transportation Mode" text', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const transportText = screen.getByText("Transportation Mode");
    expect(transportText).toBeInTheDocument();
});

// Test if the button "Generate" is rendered
test('renders the "Generate" button', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const generateButton = screen.getByText("Generate");
    expect(generateButton).toBeInTheDocument();
});