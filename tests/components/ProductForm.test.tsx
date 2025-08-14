import { render, screen } from "@testing-library/react";
import ProductForm from "../../src/components/ProductForm";
import AllProviders from "../AllProviders";

describe("ProductForm", () => {
  it("should render ProductForm form fields", async () => {
    render(
      <AllProviders>
        <ProductForm onSubmit={vi.fn()} />
      </AllProviders>
    );
    const nameInput = await screen.findByRole("textbox", { name: /name/i });
    expect(nameInput).toBeInTheDocument();
    const priceInput = await screen.findByPlaceholderText(/price/i);
    expect(priceInput).toBeInTheDocument();
    const dropdownButton = await screen.findByRole("combobox", { name: /category/i });
    expect(dropdownButton).toBeInTheDocument();
  });
});
