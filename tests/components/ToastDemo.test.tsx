import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";

describe("ToastDemo", () => {
  const renderComponent = () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );
    const component = screen.getByRole("button");
    return { component };
  };
  it("should display toast when clicked", async () => {
    const { component } = renderComponent();
    expect(component).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(component);
    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
    // await waitFor(() => {
    //   const toast = screen.getByText(/success/i);
    //   expect(toast).toBeInTheDocument();
    // });
  });
});
