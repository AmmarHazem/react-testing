import { render, screen } from "@testing-library/react";
import BrowseProducts from "../../src/pages/BrowseProductsPage";
import AllProviders from "../AllProviders";

describe("BrowseProducts", () => {
  it("should render BrowseProducts", async () => {
    render(
      <AllProviders>
        <BrowseProducts />
      </AllProviders>
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: /categories/i })).toBeInTheDocument();
    // expect(screen.getByTestId("categories-loading-skeleton")).toBeInTheDocument();
    // const filterCategoryButton = await screen.findByText(/Refined Concrete Soap/i);
    // expect(filterCategoryButton).toBeInTheDocument();
    // expect(screen.queryByText(/all/i)).toBeInTheDocument();
    // expect(screen.queryByText(/price/i)).toBeInTheDocument();
  });
});
