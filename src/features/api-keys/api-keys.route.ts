import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";
import type { ApiKeyRequest } from "./api-keys.types";
import { ApiKeyService } from "./api-keys.service";
import { apiKeyMiddleware } from "../../middleware/apiKey.middleware";

const app = new Hono<{ Bindings: Bindings }>();
const service = new ApiKeyService();

// Protect with master API key
app.use("/*", apiKeyMiddleware());

app.post("/", async (c) => {
  const body = await c.req.json<ApiKeyRequest>();
  const result = await service.handleRequest(body, c.env);

  return c.json(result);
});

export const apiKeyRoutes = app;
