import { createRoute, z } from "@hono/zod-openapi";
import * as httpStatusCodes from "@/constants/http-status-codes";
import {
  insertProductsSchema,
  patchProductsSchema,
  selectProductsSchema,
} from "@/db/zod.schema";
import createErrorSchema from "@/lib/create-error-schema";
import oneOf from "@/lib/one-of";
import jsonContentOneOf from "@/lib/json-content-oneof";

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .uuid()
    .openapi({
      param: {
        name: "id",
        in: "path",
      },
      example: "bf1a37bd-2a5c-3627-a617-22a1de778b36",
    }),
});
const NotFoundSchema = z
  .object({
    message: z.string().openapi({
      description: "Error message",
      example: "Not found",
    }),
  })
  .openapi({
    example: {
      message: "Not found 1",
    },
  });

const MessageSchema = z.object({
  message: z.string().openapi({
    description: "message",
    example: "Product deleted",
  }),
});

const tags = ["products"];
export const list = createRoute({
  tags,
  method: "get",
  path: "/products",
  responses: {
    [httpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: z.array(selectProductsSchema),
        },
      },
      description: "The list of products",
    },
  },
});
export const create = createRoute({
  tags,
  method: "post",
  path: "/products",
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertProductsSchema,
        },
      },
      description: "The product to create",
    },
  },
  responses: {
    [httpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: selectProductsSchema,
        },
      },
      description: "The created product",
    },
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(insertProductsSchema),
        },
      },
      description: "The validation error(s)",
    },
  },
});
export const getOne = createRoute({
  tags,
  method: "get",
  path: "/products/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    [httpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: selectProductsSchema,
        },
      },
      description: "Retrieve a single Product",
    },
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: ParamsSchema,
        },
      },
      description: "Invalid Id error",
    },
    [httpStatusCodes.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: NotFoundSchema,
        },
      },
      description: "The product was not found",
    },
  },
});
export const updateOne = createRoute({
  tags,
  method: "patch",
  path: "/products/{id}",
  request: {
    params: ParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: patchProductsSchema,
        },
      },
      description: "The product to update",
    },
  },
  responses: {
    [httpStatusCodes.OK]: {
      content: {
        "application/json": {
          schema: selectProductsSchema,
        },
      },
      description: "Updated Product",
    },
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(patchProductsSchema), createErrorSchema(ParamsSchema)],
      "The validation error(s)"
    ),
    [httpStatusCodes.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: NotFoundSchema,
        },
      },
      description: "The product was not found",
    },
  },
});
export const remove = createRoute({
  tags,
  method: "delete",
  path: "/products/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    [httpStatusCodes.NO_CONTENT]: {
      description: "Delete a Product",
    },
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: ParamsSchema,
        },
      },
      description: "Invalid Id error",
    },
    [httpStatusCodes.NOT_FOUND]: {
      content: {
        "application/json": {
          schema: NotFoundSchema,
        },
      },
      description: "The product was not found",
    },
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type UpdateOneRoute = typeof updateOne;
export type RemoveRoute = typeof remove;
