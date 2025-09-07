import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import routes from "../src/routes";
import { testProductsList } from "./mocks/data";

describe("testing page routing ", () => {
  const renderRouter = ({ entries }: { entries?: string[] }) => {
    const router = createMemoryRouter(routes, { initialEntries: entries });
    render(<RouterProvider router={router} />);
  };
  it("should render home page for /", () => {
    renderRouter({});
    const heading = screen.getByRole("heading", { name: new RegExp("home", "i") });
    expect(heading).toBeInTheDocument();
  });
  it("should render products page for /products", () => {
    renderRouter({ entries: ["/products"] });
    const heading = screen.getByRole("heading", { name: new RegExp("Products", "i") });
    expect(heading).toBeInTheDocument();
  });
  it.each(testProductsList)("should render product $name", async ({ id, name }) => {
    renderRouter({ entries: [`/products/${id}`] });
    const productNameHeading = await screen.findByRole("heading", { name: new RegExp(name, "i") });
    expect(productNameHeading).toBeInTheDocument();
  });
  it("should render 404 route for invalid routes", () => {
    renderRouter({ entries: ["/abc"] });
    const errorHeading = screen.getByRole("heading", { name: /ops/i });
    expect(errorHeading).toBeInTheDocument();
  });
});
