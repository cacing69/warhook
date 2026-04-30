import { Hono } from "hono";
import type { Bindings } from "./types/bindings";
import { healthRoutes } from "./features/health/health.route";
import { htmlRoutes } from "./features/html/html.route";
import { ntfyRoutes } from "./features/ntfy/ntfy.route";
import { webhookRoutes } from "./features/webhook/webhook.route";

const app = new Hono<{ Bindings: Bindings }>();

app.route("/", healthRoutes);
app.route("/html", htmlRoutes);
app.route("/ntfy", ntfyRoutes);
app.route("/webhook", webhookRoutes);

export default app;
