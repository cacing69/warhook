import { Hono } from "hono";

type Bindings = {
  DISCORD_WEBHOOK_URL: string;
  JWT_SECRET: string;

  APP_ENV: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("Pong!");
});

app.post("/webhook", async (c) => {
  const body = await c.req.json();

  const webhookUrl = c.env.DISCORD_WEBHOOK_URL;
  const jwtSecret = c.env.JWT_SECRET;
  const appEnv = c.env.APP_ENV;

  return c.json({
    ok: true,
    env: appEnv,
    webhookConfigured: !!webhookUrl,
    jwtLoaded: !!jwtSecret,
    body,
  });
});

export default app;
