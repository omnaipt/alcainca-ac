import { NextResponse } from "next/server";
import { createEventosSession, getUsers, getUsersSafe } from "@/lib/session";

export async function GET() {
  return NextResponse.json(getUsersSafe());
}

export async function POST(req: Request) {
  const { id, password } = await req.json();
  const users = getUsers();
  const user = users.find((u) => u.id === id);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Credenciais incorretas" }, { status: 401 });
  }

  await createEventosSession({ id: user.id, nome: user.nome, cargo: user.cargo });
  return NextResponse.json({ ok: true, nome: user.nome });
}
