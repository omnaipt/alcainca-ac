import { NextResponse } from "next/server";
import { deleteCaixaSession } from "@/lib/session";

export async function POST() {
  await deleteCaixaSession();
  return NextResponse.json({ ok: true });
}
