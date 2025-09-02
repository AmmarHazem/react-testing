import { render, screen } from "@testing-library/react";
import { CartProvider } from "../../src/providers/CartProvider";
import QuantitySelector from "../../src/components/QuantitySelector";
import { Product } from "../../src/entities";
import userEvent from "@testing-library/user-event";

describe("QuantitySelector", () => {
  const product: Product = {
    id: 1,
    categoryId: 1,
    name: "Test",
    price: 100,
  };
  it("increments/add and decrement/remove product from cart", async () => {
    render(
      <CartProvider>
        <QuantitySelector product={product} />
      </CartProvider>
    );
    const addToCartButton = screen.getByText(/add to cart/i);
    expect(addToCartButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(addToCartButton);
    const statusText = screen.getByRole("status");
    expect(statusText).toBeInTheDocument();
    const increaseButton = screen.getByLabelText("increase quantity");
    expect(increaseButton).toBeInTheDocument();
    const decreaseButton = screen.getByLabelText("decrease quantity");
    expect(decreaseButton).toBeInTheDocument();
    await user.click(increaseButton);
    await user.click(increaseButton);
    const statusText2 = screen.getByRole("status");
    expect(statusText2.textContent).toEqual("3");
    await user.click(decreaseButton);
    await user.click(decreaseButton);
    const statusText3 = screen.getByRole("status");
    expect(statusText3.textContent).toEqual("1");
    await user.click(decreaseButton);
    const addToCartButton2 = screen.getByText(/add to cart/i);
    expect(addToCartButton2).toBeInTheDocument();
  });
});
