import { goneResponse } from "@/lib/gone.ts";

export const runtime = "nodejs";

export function GET() {
  return goneResponse();
}

export function HEAD() {
  return goneResponse();
}
