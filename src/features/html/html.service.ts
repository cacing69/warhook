import type { Bindings } from "../../types/bindings";
import { SAMPLE_HTML as fallbackHtml } from "./html.fallback";

export class HtmlService {
  render(template: string, variables: Record<string, string>): string {
    let result = template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`{{${key}}}`, "g");
      result = result.replace(regex, value);
    }
    return result;
  }

  async getHtml(env: Bindings, filename: string, variables: Record<string, string> = {}): Promise<string> {
    // Try ASSETS binding first (production)
    if (env.ASSETS) {
      try {
        const response = await env.ASSETS.fetch(
          new Request(`https://assets/${filename}`)
        );
        const template = await response.text();

        // Debug: log the variables
        console.log('Variables:', variables);
        const rendered = this.render(template, variables);
        console.log('Rendered HTML preview:', rendered.substring(0, 200));

        return rendered;

      } catch (error) {
        console.error('ASSETS fetch error:', error);
        // Fallback to inline template
      }
    }

    // Fallback for local development
    return this.render(fallbackHtml, variables);
  }
}
