import { Hono } from "hono";
import type { Bindings } from "./types/bindings";
import { healthRoutes } from "./features/health/health.route";
import { htmlRoutes } from "./features/html/html.route";
import { ntfyRoutes } from "./features/ntfy/ntfy.route";
import { webhookRoutes } from "./features/webhook/webhook.route";
import { apiKeyRoutes } from "./features/api-keys/api-keys.route";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/", healthRoutes);
app.route("/html", htmlRoutes);
app.route("/ntfy", ntfyRoutes);
app.route("/webhook", webhookRoutes);
app.route("/api-keys", apiKeyRoutes);

export default app;
