export interface WebhookRequestBody {
  [key: string]: unknown;
}

export interface WebhookResponse {
  ok: boolean;
  env: string;
  webhookConfigured: boolean;
  jwtLoaded: boolean;
  body: WebhookRequestBody;
}
