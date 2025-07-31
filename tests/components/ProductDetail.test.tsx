import { render, screen } from "@testing-library/react";
import ProductDetail from "../../src/components/ProductDetail";
import { testProductsList } from "../mocks/data";
import AllProviders from "../AllProviders";

describe("ProductDetail", () => {
  const renderComponent = ({ productId }: { productId: number }) => {
    render(
      <AllProviders>
        <ProductDetail productId={productId} />
      </AllProviders>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  };
  it("should fetch and display product details", async () => {
    renderComponent({ productId: 1 });
    const header = await screen.findByRole("heading");
    expect(header).toHaveTextContent(/Product Detail/i);
    const product = testProductsList[0];
    const productNameElement = screen.getByText(new RegExp(product.name, "i"));
    expect(productNameElement).toHaveTextContent(new RegExp(product.name, "i"));
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
  it("shoud display not found if product is not found", async () => {
    renderComponent({ productId: 10 });
    const errorElement = await screen.findByText(/error/i);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(/error/i);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
