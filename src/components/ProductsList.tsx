import { Skeleton, Table } from "@radix-ui/themes";
import { FC } from "react";
import { useQuery } from "react-query";
import { Product } from "../entities";
import QuantitySelector from "./QuantitySelector";
import axios from "axios";

const skeletons = [1, 2, 3, 4, 5];

const ProductsList: FC<ProductsListProps> = ({ selectedCategoryId }) => {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: errorProducts,
  } = useQuery({
    queryKey: ["/products"],
    queryFn: async () => {
      const res = await axios.get<Product[]>("/products");
      return res.data;
    },
  });

  if (errorProducts)
    return (
      <div role="alert" aria-label="error rendering products">
        Error: {errorProducts.toString()}
      </div>
    );

  const visibleProducts = selectedCategoryId ? products?.filter((p) => p.categoryId === selectedCategoryId) : products;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isProductsLoading &&
          skeletons.map((skeleton) => (
            <Table.Row key={skeleton}>
              <Table.Cell>
                <div role="progressbar" aria-label="loading products">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell>
                <div role="progressbar">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell>
                <div role="progressbar">
                  <Skeleton />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        {!isProductsLoading &&
          visibleProducts?.map((product) => (
            <Table.Row key={product.id} aria-label={product.name}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>
                <QuantitySelector product={product} />
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};

interface ProductsListProps {
  selectedCategoryId?: number;
}

export default ProductsList;
