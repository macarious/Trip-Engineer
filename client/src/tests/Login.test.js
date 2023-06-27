import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Login from "../components/Login";

const mockLoginWithRedirect = jest.fn();

jest.mock("@auth0/auth0-react", () => ({
    ...jest.requireActual("@auth0/auth0-react"),
    Auth0Provider: ({ children }) => children,
    useAuth0: () => ({ loginWithRedirect: mockLoginWithRedirect })
}));



// Test if "Welcome to Trip Engineer!" is rendered
test("renders Not Found copy", () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByText("Welcome to Trip Engineer!")).toBeInTheDocument();
});

// Test if the button "Login" is rendered
test("renders the Login", () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByText("Login")).toBeInTheDocument();
});

// Test if the button "Login" directs user to "loginWithRedirect" function
test("redirects to loginWithRedirect", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
});

// Test if the button "Create Account" is rendered
test("renders the Create Account button", () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByText("Create Account")).toBeInTheDocument();
});

// Test if the button "Create Account" directs user to signUp function
test("redirects to signUp", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const createButton = screen.getByText("Create Account");
    fireEvent.click(createButton);
    expect(mockLoginWithRedirect).toHaveBeenCalled();
});