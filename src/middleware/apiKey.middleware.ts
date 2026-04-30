import type { MiddlewareHandler } from "hono";
import type { Bindings } from "../types/bindings";

export const apiKeyMiddleware = (): MiddlewareHandler<{
  Bindings: Bindings;
}> => {
  return async (c, next) => {
    const providedKey = c.req.header("x-api-key");

    if (!providedKey) {
      return c.json({ error: "Missing x-api-key header" }, 401);
    }

    // Early exit: check immediately during iteration
    let hasValidKey = false;
    let keyCount = 0;

    for (const [key, value] of Object.entries(c.env)) {
      if (key.startsWith("API_KEY_") && typeof value === "string") {
        keyCount++;
        // Exit early on match
        if (value === providedKey) {
          hasValidKey = true;
          break;
        }
      }
    }

    if (keyCount === 0) {
      return c.json({ error: "No API keys configured" }, 500);
    }

    if (!hasValidKey) {
      return c.json({ error: "Invalid API key" }, 403);
    }

    await next();
  };
};
