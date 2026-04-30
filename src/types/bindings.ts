export interface Bindings {
  DISCORD_WEBHOOK_URL: string;
  JWT_SECRET: string;
  NTFY_DEFAULT_TOPIC: string;
  API_KEY_MASTER?: string;
  API_KEY_CLIENT?: string;
  API_KEY_ADMIN?: string;
  APP_ENV: string;
  ASSETS: Fetcher;
}
