import { Category, Product } from "../../src/entities";

export const testProductsList: Product[] = [
  {
    id: 1,
    categoryId: 1,
    name: "Test",
    price: 100,
  },
  {
    id: 2,
    categoryId: 2,
    name: "Test 2",
    price: 200,
  },
  {
    id: 3,
    categoryId: 3,
    name: "Test 3",
    price: 300,
  },
];

export const categories: Category[] = [
  { id: 1, name: "Test" },
  { id: 2, name: "Test 2" },
  { id: 3, name: "Test 3" },
];
