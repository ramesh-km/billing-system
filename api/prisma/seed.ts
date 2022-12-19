import signale from "signale";
import db from "../src/lib/db";
import { faker } from "@faker-js/faker";

async function main() {
  // Create 100 items
  await db.item.createMany({
    data: new Array(100).fill(null).map(() => ({
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      availableQuantity: parseInt(faker.random.numeric()),
      allowedMinQuantity: 1,
      allowedMaxQuantity: 100,
    })),
  });

  signale.success("Seed data uploaded to db.")
}

main().catch((error) => {
  signale.error(error);
});
