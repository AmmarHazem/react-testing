import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
  it("should render profile with edit if admin", () => {
    render(
      <UserAccount
        user={{
          id: 1,
          name: "Ammar",
          isAdmin: true,
        }}
      />
    );
    const header = screen.getByRole("heading");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("User Profile");
    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent("Edit");
    const div = screen.getByRole("strong");
    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent("Name:");
  });
  it("should render profile without edit for non-admin", () => {
    render(<UserAccount user={{ id: 1, name: "Ammar" }} />);
    const header = screen.getByText("User Profile");
    expect(header).toHaveTextContent("User Profile");
    const strong = screen.getByText("Name:");
    expect(strong).toHaveTextContent("Name:");
    const editButton = screen.queryByRole("button");
    expect(editButton).not.toBeInTheDocument();
  });
});
