import type { Bindings } from "../../types/bindings";
import type { WebhookRequestBody, WebhookResponse } from "./webhook.types";

export class WebhookService {
  async process(
    body: WebhookRequestBody,
    env: Bindings
  ): Promise<WebhookResponse> {
    return {
      ok: true,
      env: env.APP_ENV,
      webhookConfigured: !!env.DISCORD_WEBHOOK_URL,
      jwtLoaded: !!env.JWT_SECRET,
      body,
    };
  }
}
