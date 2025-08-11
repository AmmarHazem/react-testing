import { render, screen, waitFor } from "@testing-library/react";
import { categories, testProductsList } from "../mocks/data";
import BrowseProducts from "../../src/pages/BrowseProductsPage";
import AllProviders from "../AllProviders";
import userEvent from "@testing-library/user-event";
import { simulateEndpointError } from "../utils";

describe("BrowseProducts", () => {
  it("should render BrowseProducts", async () => {
    render(
      <AllProviders>
        <BrowseProducts />
      </AllProviders>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /loading categories/i })).toBeInTheDocument();
    expect(screen.getAllByRole("progressbar", { name: /loading products/i }).length).toBeGreaterThan(0);
  });
  it("handles error response from server", async () => {
    simulateEndpointError({ endpoint: "/products" });
    simulateEndpointError({ endpoint: "/categories" });
    render(
      <AllProviders>
        <BrowseProducts />
      </AllProviders>
    );
    const productsErrorElement = await screen.findByLabelText(/error rendering products/i);
    expect(productsErrorElement).toBeInTheDocument();
  });
  it("should render all products", async () => {
    render(
      <AllProviders>
        <BrowseProducts />
      </AllProviders>
    );
    await waitFor(() => {}, { interval: 3000 });
    for (const prod of testProductsList) {
      const productTableRow = screen.getByRole("row", { name: prod.name });
      expect(productTableRow).toBeInTheDocument();
    }
  });
  it("renders categories dropdown list and filters products based on selected category", async () => {
    render(
      <AllProviders>
        <BrowseProducts />
      </AllProviders>
    );
    const dropdownButton = await screen.findByRole("combobox", { name: /Filter by Category/i });
    expect(dropdownButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(dropdownButton);
    expect(screen.getByRole("option", { name: /all/i })).toBeInTheDocument();
    for (const category of categories) {
      expect(screen.getByRole("option", { name: category.name })).toBeInTheDocument();
    }
    await user.click(screen.getByRole("option", { name: categories[0].name }));
    const newDropdownButton = screen.getByRole("combobox");
    expect(newDropdownButton).toBeInTheDocument();
    expect(newDropdownButton.textContent).toEqual(categories[0].name);
    const categoryProducts = testProductsList.filter((prod) => prod.categoryId === categories[0].id);
    for (const category of categoryProducts) {
      const categoryRow = screen.getByRole("row", { name: category.name });
      expect(categoryRow).toBeInTheDocument();
    }
    const productsTableRows = screen.getAllByRole("row", {});
    expect(productsTableRows.length - 1).toEqual(categoryProducts.length);
    await user.click(dropdownButton);
    const allOption = screen.getByRole("option", { name: /all/i });
    expect(allOption).toBeInTheDocument();
    await user.click(allOption);
    const allTableRows = screen.getAllByRole("row");
    expect(allTableRows.length - 1).toEqual(testProductsList.length);
    for (const prod of testProductsList) {
      const productTableRow = screen.getByRole("row", { name: prod.name });
      expect(productTableRow).toBeInTheDocument();
    }
  });
});
