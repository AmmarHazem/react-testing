import { http, HttpResponse, RequestHandler } from "msw";
import { categories, testProductsList } from "./data";

export const handlers: RequestHandler[] = [
  http.get("/products/:id", ({ params }) => {
    const { id } = params;
    const product = testProductsList.find((item) => item.id === Number(id));
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(product);
  }),
  http.get("/products", () => {
    return HttpResponse.json(testProductsList);
  }),
  http.get("/categories", () => {
    return HttpResponse.json(categories);
  }),
];
