import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should handle empty image list ", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
    const gallery = screen.queryByRole("list");
    expect(gallery).not.toBeInTheDocument();
  });
  it("should render list of images", async () => {
    const images = ["test1", "test2", "test3"];
    render(<ProductImageGallery imageUrls={images} />);
    // const imageElements = await screen.findAllByRole('img')
    for (const src of images) {
      const img = screen.getByTestId(src);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", src);
    }
  });
});
