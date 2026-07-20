export const runtime = "nodejs";

const GONE_BODY = "410 Gone";

export function goneResponse(): Response {
  return new Response(GONE_BODY, {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
