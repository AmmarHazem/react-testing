import { render, screen } from "@testing-library/react";
import { Product } from "../../src/entities";
import ProductForm from "../../src/components/ProductForm";
import AllProviders from "../AllProviders";
import { categories } from "../mocks/data";

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
  it("should render form with initial values properly", async () => {
    const product: Product = { name: "Akira", categoryId: categories[0].id, id: 1, price: 100 };
    render(
      <AllProviders>
        <ProductForm onSubmit={vi.fn()} product={product} />
      </AllProviders>
    );
    const nameInput = await screen.findByRole<HTMLInputElement>("textbox", { name: /name/i });
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toEqual(product.name);
    const priceInput = await screen.findByPlaceholderText<HTMLInputElement>(/price/i);
    expect(priceInput.value).toEqual(product.price.toString());
    const categoriesDropdownButton = await screen.findByRole("combobox", { name: "category" });
    expect(categoriesDropdownButton).toBeInTheDocument();
    expect(categoriesDropdownButton.textContent).toEqual(categories.find((cat) => cat.id === product.categoryId)?.name);
  });
});
