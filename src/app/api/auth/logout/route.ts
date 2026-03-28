import { NextResponse } from "next/server";
import { deleteEventosSession } from "@/lib/session";

export async function POST() {
  await deleteEventosSession();
  return NextResponse.json({ ok: true });
}
