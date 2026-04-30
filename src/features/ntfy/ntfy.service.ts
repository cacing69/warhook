import type { NtfyRequestBody, NtfyResponse } from "./ntfy.types";

export class NtfyService {
  private readonly baseUrl = "https://ntfy.sh";

  async send(topic: string, body: NtfyRequestBody): Promise<NtfyResponse> {
    const headers: Record<string, string> = {};

    if (body.title) headers["Title"] = body.title;
    if (body.tag) headers["Tags"] = body.tag;
    if (body.actions) headers["Actions"] = JSON.stringify(body.actions);

    const response = await fetch(`${this.baseUrl}/${topic}`, {
      method: "POST",
      headers,
      body: body.message,
    });

    return {
      status: response.status,
      message: "Notification sent successfully",
    };
  }
}
