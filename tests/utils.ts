import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";

export function simulateEndpointError({ endpoint }: { endpoint: string }) {
  server.use(http.get(endpoint, () => HttpResponse.error()));
}
