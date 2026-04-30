import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";
import type { NtfyRequestBody } from "./ntfy.types";
import { NtfyService } from "./ntfy.service";
import { apiKeyMiddleware } from "../../middleware/apiKey.middleware";

const app = new Hono<{ Bindings: Bindings }>();
const service = new NtfyService();

// Protect only POST route with API key
app.post("/", apiKeyMiddleware(), async (c) => {
  const body = await c.req.json<NtfyRequestBody>();
  const topic = c.env.NTFY_DEFAULT_TOPIC;

  const result = await service.send(topic, body);

  return c.json(result);
});

export const ntfyRoutes = app;
