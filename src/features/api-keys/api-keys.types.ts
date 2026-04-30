export interface ApiKey {
  key: string;
  name: string;
  createdAt: string;
  scopes?: string[];
}

export interface ApiKeyRequest {
  action: "register" | "list" | "delete";
  name?: string;
  apiKey?: string;
}

export interface ApiKeyResponse {
  success: boolean;
  apiKeys?: ApiKey[];
  message?: string;
}
