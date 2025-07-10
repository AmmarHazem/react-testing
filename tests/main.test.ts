import { it, expect, describe } from "vitest";

describe("group", () => {
  it("should", async () => {
    const res = await fetch("/categories");
    const data = await res.json();
    // console.log("data", data);
    expect(data.length).toEqual(3);
    expect(1).toBeTruthy();
  });
});
