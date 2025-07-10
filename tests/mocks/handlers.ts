import { http, HttpResponse, RequestHandler } from "msw";

export const handlers: RequestHandler[] = [
  http.get("/categories", () => {
    return HttpResponse.json([
      { id: 1, name: "Test" },
      { id: 2, name: "Test 2" },
      { id: 3, name: "Test 3" },
    ]);
  }),
];
