import { createRouter } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/constants/http-status-codes";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: "Root Products application fetched successfully",
      },
    },
  }),
  async (c) => {
    return c.json({ message: "Hello Micheal" });
  }
);

export default router;
