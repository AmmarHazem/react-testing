import ProductForm from "../components/ProductForm";
import { ProductFormData } from "../validationSchemas/productSchema";

const PlaygroundPage = () => {
  return (
    <ProductForm
      onSubmit={async function (product: ProductFormData) {
        console.log("Function not implemented.", product);
      }}
    />
  );
};

export default PlaygroundPage;
