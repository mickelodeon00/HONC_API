import { OpenAPIHono, RouteConfig, RouteHandler, z } from "@hono/zod-openapi";
import { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

export type Bindings = {
  DATABASE_URL: string;
  CLOUDFLARE_ENV: string;
};

type Variables = {
  db: NeonHttpDatabase<typeof schema>;
};

export type AppBindings = { Bindings: Bindings; Variables: Variables };
export type AppOpenAPI = OpenAPIHono<AppBindings>;
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type ZodSchema =
  | z.ZodUnion<[z.AnyZodObject, ...z.AnyZodObject[]]>
  | z.AnyZodObject
  | z.ZodArray<z.AnyZodObject>;
