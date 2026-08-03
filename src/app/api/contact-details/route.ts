import { NextResponse } from "next/server";
import { MAINTENANCE_CONTACT, RENTAL_CONTACT } from "../../../content/shared.ts";

export const runtime = "nodejs";

const CONTACTS = {
  rental: RENTAL_CONTACT,
  maintenance: MAINTENANCE_CONTACT,
} as const;

export function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("contact");
  const contact = key === "rental" || key === "maintenance" ? CONTACTS[key] : null;

  if (!contact) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      phone: contact.phone,
      phoneDisplay: contact.phoneDisplay,
      email: contact.email,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
