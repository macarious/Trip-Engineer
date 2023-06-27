import { render, screen } from '@testing-library/react';
import PlanGenerator from '../components/PlanGenerator';
import { MemoryRouter } from 'react-router-dom';

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

test('renders the form', () => {
    mockIsAuthenticated = true;
    render(<PlanGenerator />, { wrapper: MemoryRouter });
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
}
);