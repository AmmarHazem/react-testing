import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChnage = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChnage} />
      </Theme>
    );
    const component = screen.getByText(/new/i);
    const button = screen.getByRole("combobox");
    const user = userEvent.setup();
    return { onChnage, button, component, user };
  };
  it("should render OrderStatusSelector", async () => {
    const { user, component, button, onChnage } = renderComponent();
    expect(component).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    await user.click(button);
    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(3);
    const labels = options.map((op) => op.textContent);
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
    const processedOption = screen.getByText(/processed/i);
    expect(processedOption).toBeInTheDocument();
    await user.click(processedOption);
    expect(screen.getByText(/processed/i)).toBeInTheDocument();
    expect(onChnage).toHaveBeenCalledOnce();
    expect(onChnage.mock.calls[0][0]).toEqual("processed");
    expect(screen.queryByText(/new/i)).not.toBeInTheDocument();
    await user.click(button);
    await user.click(screen.getByText(/fulfilled/i));
    expect(button).toHaveTextContent(/fulfilled/i);
  });
  it.each([
    { value: "processed", label: /processed/i },
    { value: "fulfilled", label: /fulfilled/i },
  ])("should select $value when $label is clicked", async ({ value, label }) => {
    const { button, user, onChnage } = renderComponent();
    await user.click(button);
    await user.click(screen.getByText(label));
    expect(button).toHaveTextContent(label);
    expect(onChnage).toHaveBeenCalledWith(value);
  });
});
