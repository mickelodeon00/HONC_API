import { AppOpenAPI } from "@/lib/types";
import { version } from "../../package.json";
import { createFiberplane } from "@fiberplane/hono";

export default function configureOpenApi(app: AppOpenAPI) {
  // Generate OpenAPI documentation at /openapi.json
  app
    .doc("/doc", {
      openapi: "3.0.0",
      info: {
        title: "Products API! 🪿",
        version,
        description: "An API connected to product neon DB",
      },
    })
    // Fiberplane integration
    .use(
      "/fp/*",
      createFiberplane({
        app,
        openapi: { url: "/doc" },
      })
    );
}
