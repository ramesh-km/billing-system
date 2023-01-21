import { getDuplicates } from "./arrays";

describe("get duplicates", () => {
  const items = [
    { itemId: 1, quantity: 3 },
    { itemId: 2, quantity: 3 },
    { itemId: 3, quantity: 3 },
  ];
  it("returns empty array if no duplicates present", () => {
    expect(getDuplicates(items, "itemId")).toHaveLength(0);
  });
  it("returns duplicates correctly", () => {
    expect(getDuplicates(items.concat(items[0], items[1]), "itemId")).toEqual([
      items[0],
      items[1],
    ]);
  });
});
