import ProductForm from "../components/ProductForm";
import { ProductFormData } from "../validationSchemas/productSchema";

const PlaygroundPage = () => {
  return (
    <ProductForm
      product={{ name: "Akira", categoryId: 1, id: 1, price: 100 }}
      onSubmit={async function (product: ProductFormData) {
        console.log("Function not implemented.", product);
      }}
    />
  );
};

export default PlaygroundPage;
