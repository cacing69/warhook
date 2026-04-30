import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => c.json({ status: "ok", message: "Hello Hono!" }));

app.get("/ping", (c) => c.json({ status: "ok", message: "Pong!" }));

export const healthRoutes = app;
