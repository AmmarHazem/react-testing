import { render, screen } from "@testing-library/react";
import AuthStatus from "../../src/components/AuthStatus";

describe("AuthStatus", () => {
  it("shows authenticated user state", async () => {
    vi.mock("@auth0/auth0-react", () => ({
      useAuth0: vi.fn().mockReturnValue({
        logout: vi.fn(),
        user: { name: "Test" },
        isAuthenticated: true,
        isLoading: false,
      }),
    }));
    render(<AuthStatus />);
    const loadingText = screen.queryByText(/loading/i);
    expect(loadingText).not.toBeInTheDocument();
    const userNameText = screen.getByText(/test/i);
    expect(userNameText).toBeInTheDocument();
    const logoutButton = screen.getByText(/log out/i);
    expect(logoutButton).toBeInTheDocument();
  });
});
