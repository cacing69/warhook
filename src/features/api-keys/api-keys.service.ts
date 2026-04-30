import type { Bindings } from "../../types/bindings";
import type { ApiKeyRequest, ApiKeyResponse, ApiKey } from "./api-keys.types";

export class ApiKeyService {
  private generateApiKey(): string {
    return `key_${crypto.randomUUID().replace(/-/g, "").substring(0, 16)}`;
  }

  async handleRequest(request: ApiKeyRequest, env: Bindings): Promise<ApiKeyResponse> {
    const currentKeysJson = env.API_KEYS || "[]";
    let apiKeys: ApiKey[];

    try {
      apiKeys = JSON.parse(currentKeysJson);
    } catch {
      apiKeys = [];
    }

    if (!Array.isArray(apiKeys)) {
      apiKeys = [];
    }

    switch (request.action) {
      case "register": {
        const newKey: ApiKey = {
          key: this.generateApiKey(),
          name: request.name || "Unnamed Key",
          createdAt: new Date().toISOString(),
          scopes: ["ntfy"],
        };
        apiKeys.push(newKey);
        return {
          success: true,
          apiKeys,
          message: `New API key "${newKey.name}" registered: ${newKey.key}`,
        };
      }

      case "list":
        // Return keys without showing full key value (security)
        const maskedKeys = apiKeys.map((k) => ({
          ...k,
          key: `${k.key.substring(0, 8)}...${k.key.substring(k.key.length - 4)}`,
        }));
        return {
          success: true,
          apiKeys: maskedKeys,
        };

      case "delete":
        if (!request.apiKey) {
          return {
            success: false,
            message: "apiKey is required for delete action",
          };
        }
        const filteredKeys = apiKeys.filter((k) => k.key !== request.apiKey);
        if (filteredKeys.length === apiKeys.length) {
          return {
            success: false,
            message: "API key not found",
          };
        }
        return {
          success: true,
          apiKeys: filteredKeys,
          message: `API key deleted`,
        };

      default:
        return {
          success: false,
          message: "Invalid action. Use: register, list, or delete",
        };
    }
  }

  getKeysJson(apiKeys: ApiKey[]): string {
    return JSON.stringify(apiKeys);
  }
}
