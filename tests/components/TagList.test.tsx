import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  const renderComponent = () => {
    render(<TagList />);
    const tagList = screen.getByRole("list");
    return { tagList };
  };
  it("should render TagList", async () => {
    const { tagList } = renderComponent();
    expect(tagList).toBeInTheDocument();
    // await waitFor(() => {
    //   const listItems = screen.getAllByRole("listitem");
    //   expect(listItems.length).toBeGreaterThan(0);
    // });
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
