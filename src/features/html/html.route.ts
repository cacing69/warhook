import { Hono } from "hono";
import type { Bindings } from "../../types/bindings";
import { HtmlService } from "./html.service";

const app = new Hono<{ Bindings: Bindings }>();
const service = new HtmlService();

app.get("/sample.html", async (c) => {
  const html = await service.getHtml(c.env, "sample.html", {
    username: "iamutaki",
  });
  return c.html(html);
});

export const htmlRoutes = app;
