import { createRouter } from "@/lib/create-app";
import * as productRoutes from "./products.routes";
import * as productHandlers from "./products.handlers";

const router = createRouter()
  .openapi(productRoutes.list, productHandlers.list)
  .openapi(productRoutes.getOne, productHandlers.getOne)
  .openapi(productRoutes.create, productHandlers.create)
  .openapi(productRoutes.updateOne, productHandlers.updateOne)
  .openapi(productRoutes.remove, productHandlers.remove);

export default router;
