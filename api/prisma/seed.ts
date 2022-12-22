import signale from "signale";
import db from "../src/lib/db";
import { faker } from "@faker-js/faker";
import { truncateText } from "../src/lib/strings";

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

  // Create 100 customers
  await db.customer.createMany({
    data: new Array(100).fill(null).map(() => ({
      name: truncateText(faker.name.fullName(), 50),
      email: truncateText(faker.internet.email(), 50),
      phone: truncateText(faker.phone.number(), 20),
      address: truncateText(faker.address.streetAddress(), 100),
    })),
    skipDuplicates: true,
  });

  signale.success("Seed data uploaded to db.");
}

main().catch((error) => {
  signale.error(error);
});
