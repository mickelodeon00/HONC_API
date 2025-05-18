import { OpenAPIHono } from "@hono/zod-openapi";
import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { serveEmojiFavicon } from "stoker/middlewares";
import { AppBindings } from "@/lib/types";
import defaultHook from "@/lib/default-hook";
import * as schema from "@/db/schema";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  // Middleware: Set up database connection for all routes
  app.use(serveEmojiFavicon("🦆"));
  app.use(async (c, next) => {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql, { schema });
    c.set("db", db);
    await next();
  });

  return app;
}
