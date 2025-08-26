import { render, screen } from "@testing-library/react";
import { Product } from "../../src/entities";
import ProductForm from "../../src/components/ProductForm";
import AllProviders from "../AllProviders";
import { categories } from "../mocks/data";

describe("ProductForm", () => {
  const renderComponent = ({ product }: { product?: Product }) => {
    render(
      <AllProviders>
        <ProductForm onSubmit={vi.fn()} product={product} />
      </AllProviders>
    );
    return {
      getCategoryInput: async () => {
        const categoriesDropdownButton = await screen.findByRole("combobox", { name: "category" });
        return categoriesDropdownButton;
      },
      getPriceInput: async () => {
        const priceInput = await screen.findByPlaceholderText<HTMLInputElement>(/price/i);
        return priceInput;
      },
      getNameInput: async () => {
        const nameInput = await screen.findByRole<HTMLInputElement>("textbox", { name: /name/i });
        return nameInput;
      },
    };
  };
  it("should render ProductForm form fields", async () => {
    const { getNameInput, getPriceInput, getCategoryInput } = renderComponent({});
    const nameInput = await getNameInput();
    expect(nameInput).toBeInTheDocument();
    const priceInput = await getPriceInput();
    expect(priceInput).toBeInTheDocument();
    const dropdownButton = await getCategoryInput();
    expect(dropdownButton).toBeInTheDocument();
  });
  it("should render form with initial values properly", async () => {
    const product: Product = { name: "Akira", categoryId: categories[0].id, id: 1, price: 100 };
    const { getNameInput, getPriceInput, getCategoryInput } = renderComponent({ product });
    const nameInput = await getNameInput();
    expect(nameInput).toBeInTheDocument();
    expect(nameInput.value).toEqual(product.name);
    const priceInput = await getPriceInput();
    expect(priceInput.value).toEqual(product.price.toString());
    const categoriesDropdownButton = await getCategoryInput();
    expect(categoriesDropdownButton).toBeInTheDocument();
    expect(categoriesDropdownButton.textContent).toEqual(categories.find((cat) => cat.id === product.categoryId)?.name);
  });
});
