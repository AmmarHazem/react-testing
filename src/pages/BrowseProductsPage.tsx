import { useState } from "react";
import CategoriesDropDown from "../components/CategoriesDropDown";
import ProductsList from "../components/ProductsList";
import "react-loading-skeleton/dist/skeleton.css";

function BrowseProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>();

  return (
    <div>
      <h1>Products</h1>
      <div className="max-w-xs">
        <CategoriesDropDown onChange={setSelectedCategoryId} />
      </div>
      <ProductsList selectedCategoryId={selectedCategoryId} />
    </div>
  );
}

export default BrowseProducts;
