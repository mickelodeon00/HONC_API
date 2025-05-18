import { config } from "dotenv";
import { z } from "zod";

config({ path: [".dev.vars"] });

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

const env = EnvSchema.parse(process.env);

export default env;
