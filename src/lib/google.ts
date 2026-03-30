import "server-only";
import { google } from "googleapis";
import type { EstadoMovimento, FormaPagamento } from "./caixa-categorias";

function getAuth() {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || "{}");
    return new google.auth.GoogleAuth({
          credentials,
          scopes: [
                  "https://www.googleapis.com/auth/spreadsheets",
                  "https://www.googleapis.com/auth/drive.file",
                ],
    });
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || "";
const SHEET_RANGE = "Movimentos!A:M";

export type Movimento = {
    id: string;
    data: string;
    tipo: "Entrada" | "Saída";
    categoria: string;
    descricao: string;
    valor: number;
    lancadoPor: string;
    cargo: string;
    documento: string;
    dataLancamento: string;
    formaPagamento: FormaPagamento;
    estado: EstadoMovimento;
    aprovadoPor: string;
};

/** Ensure the "Movimentos" sheet tab exists, create it if not */
async function ensureMovimentosSheet(): Promise<void> {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

  const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SHEET_ID,
        fields: "sheets.properties.title",
  });

  const sheetNames = spreadsheet.data.sheets?.map(s => s.properties?.title) || [];

  if (!sheetNames.includes("Movimentos")) {
        await sheets.spreadsheets.batchUpdate({
                spreadsheetId: SHEET_ID,
                requestBody: {
                          requests: [
                            {
                                          addSheet: {
                                                          properties: {
                                                                            title: "Movimentos",
                                                          },
                                          },
                            },
                                    ],
                },
        });
  }
}

/** Get all movements from Google Sheet */
export async function getMovimentos(): Promise<Movimento[]> {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

  try {
        const res = await sheets.spreadsheets.values.get({
                spreadsheetId: SHEET_ID,
                range: SHEET_RANGE,
        });

      const rows = res.data.values || [];
        // Skip header row
      if (rows.length <= 1) return [];

      return rows.slice(1).map((row) => ({
              id: row[0] || "",
              data: row[1] || "",
              tipo: (row[2] as "Entrada" | "Saída") || "Entrada",
              categoria: row[3] || "",
              descricao: row[4] || "",
              valor: parseFloat(row[5]) || 0,
              lancadoPor: row[6] || "",
              cargo: row[7] || "",
              documento: row[8] || "",
              dataLancamento: row[9] || "",
              formaPagamento: (row[10] as FormaPagamento) || "Dinheiro",
              estado: (row[11] as EstadoMovimento) || "Aprovado",
              aprovadoPor: row[12] || "",
      }));
  } catch {
        // If sheet doesn't exist yet, create it and return empty
      await ensureMovimentosSheet();
        await initSheet();
        return [];
  }
}

/** Append a new movement to the Google Sheet */
export async function addMovimento(mov: Movimento): Promise<void> {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: SHEET_RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: {
                values: [[
                          mov.id,
                          mov.data,
                          mov.tipo,
                          mov.categoria,
                          mov.descricao,
                          mov.valor,
                          mov.lancadoPor,
                          mov.cargo,
                          mov.documento,
                          mov.dataLancamento,
                          mov.formaPagamento,
                          mov.estado,
                          mov.aprovadoPor,
                        ]],
        },
  });
}

/** Approve a movement by ID — updates estado and aprovadoPor columns */
export async function aprovarMovimento(movId: string, aprovadoPor: string): Promise<boolean> {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: SHEET_RANGE,
    });

    const rows = res.data.values || [];
    // Find the row index (1-based, +1 for header)
    const rowIndex = rows.findIndex((row, i) => i > 0 && row[0] === movId);
    if (rowIndex === -1) return false;

    // Update columns L (estado) and M (aprovadoPor) — row is 1-based in sheets
    const sheetRow = rowIndex + 1;
    await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `Movimentos!L${sheetRow}:M${sheetRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [["Aprovado", aprovadoPor]],
        },
    });

    return true;
}

/** Upload a file to Google Drive folder */
export async function uploadToDrive(
    fileName: string,
    mimeType: string,
    fileBuffer: Buffer
  ): Promise<string> {
    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

  const { Readable } = await import("node:stream");

  const res = await drive.files.create({
        requestBody: {
                name: fileName,
                parents: [FOLDER_ID],
        },
        media: {
                mimeType,
                body: Readable.from(fileBuffer),
        },
        fields: "id,webViewLink",
  });

  // Make file viewable by anyone with the link
  await drive.permissions.create({
        fileId: res.data.id!,
        requestBody: {
                role: "reader",
                type: "anyone",
        },
  });

  return res.data.webViewLink || `https://drive.google.com/file/d/${res.data.id}/view`;
}

/** Initialize the sheet with headers if empty */
export async function initSheet(): Promise<void> {
    // Ensure the Movimentos tab exists first
  await ensureMovimentosSheet();

  const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: "Movimentos!A1:M1",
  });

  if (!res.data.values || res.data.values.length === 0) {
        await sheets.spreadsheets.values.update({
                spreadsheetId: SHEET_ID,
                range: "Movimentos!A1:M1",
                valueInputOption: "USER_ENTERED",
                requestBody: {
                          values: [["ID", "Data", "Tipo", "Categoria", "Descrição", "Valor", "Lançado por", "Cargo", "Documento", "Data Lançamento", "Forma Pagamento", "Estado", "Aprovado por"]],
                },
        });
  }
}
