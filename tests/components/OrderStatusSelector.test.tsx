import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChnage = () => {};
    render(
      <Theme>
        <OrderStatusSelector onChange={onChnage} />
      </Theme>
    );
    const component = screen.getByText(/new/i);
    const button = screen.getByRole("combobox");
    return { onChnage, button, component };
  };
  it("should render OrderStatusSelector", async () => {
    const { component, button } = renderComponent();
    expect(component).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(button);
  });
});
