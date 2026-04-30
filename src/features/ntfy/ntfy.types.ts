export interface NtfyRequestBody {
  message: string;
  title?: string;
  tag?: string;
  actions?: NtfyAction[];
}

export interface NtfyAction {
  action: "view" | "broadcast" | "http";
  label: string;
  url?: string;
  intent?: "open-url" | "clear";
  body?: string;
  headers?: Record<string, string>;
}

export interface NtfyResponse {
  status: number;
  message: string;
}
