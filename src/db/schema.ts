import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { productCategoryEnum } from "./enum";

// type User = typeof users.$inferInsert;
// type Product = typeof products.$inferInsert;

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("firstname").notNull(),
  lastName: text("lastname").notNull(),
  email: text("email").notNull(),
  role: text("role").default("customer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: productCategoryEnum("category").default("others").notNull(),
  color: text("color"),
  outOfSales: boolean("out_of_sales").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// const schema = {
//   users,
//   products,
// };
// export default schema;
