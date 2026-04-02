import { NextResponse } from "next/server";
import { verifyEventosSession } from "@/lib/session";
import { uploadToDrive } from "@/lib/google";

export async function POST(req: Request) {
  const user = await verifyEventosSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum ficheiro enviado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `evento_${date}_${file.name}`;

    const driveLink = await uploadToDrive(fileName, file.type, buffer);

    // Convert Drive view link to direct image embed link
    const fileIdMatch = driveLink.match(/\/d\/([^/]+)/);
    const directUrl = fileIdMatch
      ? `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
      : driveLink;

    return NextResponse.json({ url: directUrl });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
