import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as schema from "@/db/schema";

// This file is used to create Zod schemas for the database tables.
// The schemas are used for validation and type inference in the application.

// Products zod schema
export const selectProductsSchema = createSelectSchema(schema.products);
export const insertProductsSchema = createInsertSchema(schema.products, {
  name: (sch) => sch.min(1).max(255),
}).omit({
  id: true,
  outOfSales: true,
  createdAt: true,
  updatedAt: true,
});
export const patchProductsSchema = insertProductsSchema.partial();

export const selectUsersSchema = createSelectSchema(schema.users);
