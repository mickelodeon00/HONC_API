import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { Bindings } from "@/lib/types";

export const getDbUrl = (env: Bindings) => {
  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  return { db };
};
