import {
  CreateRoute,
  GetOneRoute,
  ListRoute,
  RemoveRoute,
  UpdateOneRoute,
} from "./products.routes";
import { AppRouteHandler } from "@/lib/types";
import { products } from "@/db/schema";

import { NO_CONTENT, NOT_FOUND, OK } from "@/constants/http-status-codes";
import { eq } from "drizzle-orm";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const db = c.get("db");
  const data = await db.query.products.findMany();
  return c.json(data);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const db = c.get("db");
  const product = c.req.valid("json");
  const [data] = await db.insert(products).values(product).returning();
  return c.json(data, OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const data = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, id),
  });
  if (!data) {
    return c.json({ message: "Not found" }, NOT_FOUND);
  }

  return c.json(data, 200);
};
export const updateOne: AppRouteHandler<UpdateOneRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const [product] = await db
    .update(products)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();

  if (!product) {
    return c.json({ message: "Not found" }, NOT_FOUND);
  }

  return c.json(product, OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const [data] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();
  if (!data) {
    return c.json({ message: "Not found" }, NOT_FOUND);
  }

  return c.body(null, NO_CONTENT);
};
