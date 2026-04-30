import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";
import { WebhookService } from "./webhook.service";

const app = new Hono<{ Bindings: Bindings }>();
const service = new WebhookService();

app.post("/", async (c) => {
  const body = await c.req.json();

  const result = await service.process(body, c.env);

  return c.json(result);
});

export const webhookRoutes = app;
