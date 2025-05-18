import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".dev.vars" });

const sql = neon(process.env.DATABASE_URL!);
export const dbURL = process.env.DATABASE_URL;

export const db = drizzle(sql);
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration complete");
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};
main();
