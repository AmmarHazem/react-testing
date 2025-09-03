import { useQuery } from "react-query";
import { Category } from "../entities";

function CategoryList() {
  const {
    error,
    data: categories,
    isLoading: loading,
  } = useQuery<Category[]>({
    queryKey: ["/categories"],
    queryFn: async () => {
      const res = await fetch("/categories");
      return res.json();
    },
  });

  if (error) return <div>Error: {`${error}`}</div>;

  return (
    <div>
      <h2>Category List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {categories!.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList;
