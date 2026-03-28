import { NextResponse } from "next/server";
import { verifyCaixaSession } from "@/lib/session";
import { uploadToDrive } from "@/lib/google";

export async function POST(req: Request) {
  const user = await verifyCaixaSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum ficheiro enviado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "pdf";
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `${date}_${user.nome.replace(/\s+/g, "_")}_${file.name}`;

    const driveLink = await uploadToDrive(fileName, file.type, buffer);
    return NextResponse.json({ url: driveLink });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
