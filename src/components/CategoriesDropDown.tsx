import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { FC, useCallback } from "react";
import { useQuery } from "react-query";
import { Category } from "../entities";
import { Select } from "@radix-ui/themes";

const CategoriesDropDown: FC<CategoriesDropDownProps> = ({ onChange }) => {
  const handleChange = useCallback(
    (categoryId: number) => {
      onChange(categoryId);
    },
    [onChange]
  );

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: errorCategories,
  } = useQuery({
    queryKey: ["/categories"],
    queryFn: async () => {
      const res = await axios.get<Category[]>("/categories");
      return res.data;
    },
  });

  if (isCategoriesLoading)
    return (
      <div role="progressbar" aria-label="loading categories">
        <Skeleton data-testid="categories-loading-skeleton" />
      </div>
    );
  if (errorCategories)
    return (
      <div role="alert" aria-label="error rendering categories">
        Error: {errorCategories.toString()}
      </div>
    );
  return (
    <Select.Root onValueChange={(categoryId) => handleChange(parseInt(categoryId))}>
      <Select.Trigger aria-label="filter by category" placeholder="Filter by Category" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Category</Select.Label>
          <Select.Item value="all">All</Select.Item>
          {categories?.map((category) => (
            <Select.Item key={category.id} value={category.id.toString()} aria-label={category.name}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

interface CategoriesDropDownProps {
  onChange: (categoryId: number) => void;
}

export default CategoriesDropDown;
