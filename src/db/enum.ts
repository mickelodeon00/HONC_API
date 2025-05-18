import { pgEnum } from "drizzle-orm/pg-core";

export const productCategoryEnum = pgEnum("product_category", [
  "phone",
  "laptop",
  "refrigerator",
  "earpiece",
  "television",
  "accessory",
  "others", // general fallback
]);
