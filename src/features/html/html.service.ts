import type { Bindings } from "../../types/bindings";
import { SAMPLE_HTML } from "./templates";

export class HtmlService {
  render(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    return result;
  }

  getSampleHtml(variables: Record<string, string> = {}): string {
    return this.render(SAMPLE_HTML, variables);
  }

  async getHtml(env: Bindings, filename: string, variables: Record<string, string> = {}): Promise<string> {
    return this.getSampleHtml(variables);
  }
}
