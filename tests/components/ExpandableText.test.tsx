import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  it("should render full text if shorter than limit", () => {
    const text = "x".padStart(100, "a");
    render(<ExpandableText text={text} />);
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(text);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
  it("should render trimmed text with expand button when text is more than limit", async () => {
    const text = "a".padStart(300, "x");
    const limit = 255;
    render(<ExpandableText text={text} />);
    const article = screen.getByRole("article");
    expect(article).toHaveTextContent(`${text.slice(0, limit)}...`);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/show more/i);
    const user = userEvent.setup();
    await user.click(button);
    expect(button).toHaveTextContent(/show less/i);
    expect(article).toHaveTextContent(text);
    await user.click(button);
    expect(button).toHaveTextContent(/show more/i);
  });
});
