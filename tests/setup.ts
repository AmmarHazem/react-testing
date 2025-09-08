import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";
import { server } from "./mocks/server";
import { PropsWithChildren } from "react";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

if (typeof Element.prototype.hasPointerCapture === "undefined") {
  Object.defineProperty(Element.prototype, "hasPointerCapture", {
    value: vi.fn(() => false),
    writable: true,
    configurable: true,
  });
}

if (typeof Element.prototype.scrollIntoView === "undefined") {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: vi.fn(),
    writable: true,
    configurable: true,
  });
}

vi.stubGlobal("ResizeObserver", ResizeObserver);

vi.mock("@auth0/auth0-react", async () => {
  const useAuth0 = vi.fn();
  useAuth0.mockReturnValue({
    logout: vi.fn(),
    user: { name: "Test" },
    isAuthenticated: true,
    isLoading: false,
  });
  return {
    useAuth0,
    withAuthenticationRequired: (comp: React.ReactNode) => comp,
    Auth0Provider: ({ children }: PropsWithChildren) => children,
  };
});
