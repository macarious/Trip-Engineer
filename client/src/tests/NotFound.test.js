import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import NotFound from "../components/NotFound";

// Test if 404 Page Not Found is rendered
test("renders Not Found copy", () => {
    render(<NotFound />, { wrapper: MemoryRouter });
    expect(screen.getByText("404 Page Not Found")).toBeInTheDocument();
});

// Test if the button "Return to Home" is rendered
test("renders the button", () => {
    render(<NotFound />, { wrapper: MemoryRouter });
    expect(screen.getByText("Return to Home")).toBeInTheDocument();
});
