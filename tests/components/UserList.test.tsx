import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when users array is empty", () => {
    render(<UserList users={[]} />);
    const emptyUsersListP = screen.getByText(/No users available/i);
    expect(emptyUsersListP).toBeInTheDocument();
  });
  it("should render list of users", () => {
    const users: User[] = [
      { id: 1, name: "Ammar" },
      { id: 2, name: "Akira" },
    ];
    render(<UserList users={users} />);
    for (const user of users) {
      const userLink = screen.getByText(user.name);
      expect(userLink).toBeInTheDocument();
      expect(userLink).toHaveAttribute("href", `/users/${user.id}`);
    }
  });
});
