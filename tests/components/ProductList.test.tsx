import { render, screen } from "@testing-library/react";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import { testProductsList } from "../mocks/data";
import { QueryClient, QueryClientProvider } from "react-query";

describe("ProductList", () => {
  const renderComponent = async () => {
    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <ProductList />
      </QueryClientProvider>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  };
  it.each(testProductsList)("should fetch list of products from backend $name", async (product) => {
    await renderComponent();
    const productsList = await screen.findByRole("list");
    expect(productsList.children.length).toEqual(3);
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
  it("should render empty state if no products are returned from backend", async () => {
    server.use(http.get("/products", () => HttpResponse.json([])));
    await renderComponent();
    const noProductsElement = await screen.findByText(/no products available/i);
    expect(noProductsElement).toBeInTheDocument();
  });
  it("should render error text in case server returns an error", async () => {
    server.use(http.get("/products", () => new HttpResponse(null, { status: 400 })));
    await renderComponent();
    const errorElement = await screen.findByText(/error/i);
    expect(errorElement).toBeInTheDocument();
  });
});
