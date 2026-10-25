import { getAvailability, getPricing } from "../../lib/booking-api.ts";
import { buildLlmsTxt } from "../../lib/llms.ts";

// Content files plus live prices and free dates from the booking API, rebuilt
// every 15 minutes like the rates pages.
export const revalidate = 900;

export async function GET() {
  const [pricing, availability] = await Promise.all([getPricing(), getAvailability()]);
  return new Response(buildLlmsTxt({ pricing, availability }), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
