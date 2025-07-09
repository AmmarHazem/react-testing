import "@testing-library/jest-dom/vitest";
import ResizeObserver from "resize-observer-polyfill";

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
