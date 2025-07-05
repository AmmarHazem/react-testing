import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  it("should render correctly", () => {
    render(<TermsAndConditions />);
    const header = screen.getByRole("heading");
    expect(header).toHaveTextContent(/terms & conditions/i);
    const p = screen.getByText(/Lorem ipsum/i);
    expect(p).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });
  it("should enable button when checkbox is checked", async () => {
    render(<TermsAndConditions />);
    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(checkbox);
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
