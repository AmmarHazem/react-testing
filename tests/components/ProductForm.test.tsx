import { render, screen } from "@testing-library/react";
import { Product } from "../../src/entities";
import ProductForm from "../../src/components/ProductForm";
import AllProviders from "../AllProviders";
import { categories } from "../mocks/data";
import userEvent from "@testing-library/user-event";

describe("ProductForm", () => {
  const renderComponent = ({
    product,
    onSubmit,
  }: {
    product?: Product;
    onSubmit?: (product: Partial<Product>) => Promise<void>;
  }) => {
    const submitFn = onSubmit ?? vi.fn();
    render(
      <AllProviders>
        <ProductForm onSubmit={onSubmit ?? submitFn} product={product} />
      </AllProviders>
    );
    return {
      submitFn,
      assertErrorInDocument: () => {
        const priceErrorAlert = screen.getByRole("alert");
        expect(priceErrorAlert).toBeInTheDocument();
      },
      getSubmitButton: async () => {
        const button = await screen.findByRole<HTMLButtonElement>("button", { name: "Submit" });
        return button;
      },
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
    expect(nameInput).toHaveFocus();
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
    expect(nameInput).toHaveFocus();
    expect(nameInput.value).toEqual(product.name);
    const priceInput = await getPriceInput();
    expect(priceInput.value).toEqual(product.price.toString());
    const categoriesDropdownButton = await getCategoryInput();
    expect(categoriesDropdownButton).toBeInTheDocument();
    expect(categoriesDropdownButton.textContent).toEqual(categories.find((cat) => cat.id === product.categoryId)?.name);
  });
  it("should display validation error for name input", async () => {
    const { getPriceInput, getCategoryInput, getSubmitButton, assertErrorInDocument } = renderComponent({});
    const priceInput = await getPriceInput();
    const categoryDropdown = await getCategoryInput();
    const user = userEvent.setup();
    await user.type(priceInput, "10");
    await user.tab();
    await user.click(categoryDropdown);
    const dropdownOptions = screen.getAllByRole("option");
    await user.click(dropdownOptions[0]);
    const submitButton = await getSubmitButton();
    await user.click(submitButton);
    assertErrorInDocument();
  });
  it("should display validation error for price field", async () => {
    const { getCategoryInput, getNameInput, getSubmitButton, assertErrorInDocument } = renderComponent({});
    const user = userEvent.setup();
    const nameInput = await getNameInput();
    const categoryDropdown = await getCategoryInput();
    await user.type(nameInput, "Test");
    await user.tab();
    await user.click(categoryDropdown);
    const dropdownOptions = screen.getAllByRole("option");
    await user.click(dropdownOptions[0]);
    const submitButton = await getSubmitButton();
    await user.click(submitButton);
    assertErrorInDocument();
  });
  it("should submit form successfully", async () => {
    const product: Product = {
      id: 1,
      name: "Test",
      price: 100,
      categoryId: 1,
    };
    const { submitFn, getSubmitButton } = renderComponent({ product });
    const submitButton = await getSubmitButton();
    const user = userEvent.setup();
    await user.click(submitButton);
    expect(submitFn).toBeCalledTimes(1);
    expect(submitFn).toBeCalledWith(product);
  });
  it("should submit form with error", async () => {
    const onSubmit = vi.fn(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
      throw new Error("Error");
    });
    const product: Product = {
      id: 1,
      name: "Test",
      price: 100,
      categoryId: 1,
    };
    const { submitFn, getSubmitButton } = renderComponent({ onSubmit, product });
    const submitButton = await getSubmitButton();
    const user = userEvent.setup();
    await user.click(submitButton);
    const submitButtonAfterClick = await getSubmitButton();
    expect(submitButtonAfterClick.disabled).toEqual(true);
    const errorToast = await screen.findByText("An unexpected error occurred");
    expect(errorToast).toBeInTheDocument();
    expect(submitFn).toBeCalledTimes(1);
    const submitButtonAfterServerResponse = await getSubmitButton();
    expect(submitButtonAfterServerResponse.disabled).toEqual(false);
  });
  it("should not create a product with white space as product name", async () => {
    const { getNameInput, getPriceInput, getCategoryInput, getSubmitButton } = renderComponent({});
    const nameInput = await getNameInput();
    const priceInput = await getPriceInput();
    const categoryInput = await getCategoryInput();
    const submitButton = await getSubmitButton();
    const user = userEvent.setup();
    await user.type(nameInput, " ");
    await user.type(priceInput, "100");
    await user.tab();
    await user.click(categoryInput);
    const categoryOptions = screen.getAllByRole("option");
    await user.click(categoryOptions[0]);
    await user.click(submitButton);
    const nameErrorAlert = screen.getByText(/Name is required/i);
    expect(nameErrorAlert).toBeInTheDocument();
  });
});
