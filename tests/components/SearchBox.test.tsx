import { render, screen } from "@testing-library/react";
import SearchBox from "../../src/components/SearchBox";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const handleChange = vi.fn();
    render(<SearchBox onChange={handleChange} />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    return { searchInput, handleChange };
  };
  it("should render SearchBox", () => {
    const { searchInput } = renderSearchBox();
    expect(searchInput).toBeInTheDocument();
  });
  it("should call on change when enter is pressed", async () => {
    const { searchInput, handleChange } = renderSearchBox();
    const user = userEvent.setup();
    const searchText = `Test`;
    await user.type(searchInput, `${searchText}{enter}`);
    expect(handleChange).toHaveBeenCalledOnce();
    console.log("handleChange.mock.calls[0][0]", handleChange.mock.calls[0][0]);
    expect(handleChange.mock.calls[0][0]).toEqual(searchText);
  });
  it("should not call handleChange if input field is empty", async () => {
    const { searchInput, handleChange } = renderSearchBox();
    const user = userEvent.setup();
    await user.type(searchInput, `{enter}`);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
