import { render, screen } from "@testing-library/react";
import CategoryList from "../../src/components/CategoryList";
import AllProviders from "../AllProviders";
import { categories } from "../mocks/data";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";

describe("CategoryList", () => {
  it("should fetch categories list", async () => {
    render(
      <AllProviders>
        <CategoryList />
      </AllProviders>
    );
    const header = screen.getByRole("heading", { name: "Category List" });
    expect(header).toBeInTheDocument();
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    for (const category of categories) {
      const listItem = await screen.findByText(category.name);
      expect(listItem).toBeInTheDocument();
    }
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();
  });
  it("should handle api error", async () => {
    server.use(http.get("/categories", () => HttpResponse.error()));
    render(
      <AllProviders>
        <CategoryList />
      </AllProviders>
    );
    const header = screen.getByRole("heading", { name: "Category List" });
    expect(header).toBeInTheDocument();
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
    const error = await screen.findByText(/error/i);
    expect(error).toBeInTheDocument();
  });
});
