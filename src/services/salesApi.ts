import type { Sale } from "../types/sales";

const GOOGLE_SHEETS_URL =
  "https://opensheet.elk.sh/TU_ID_DE_SHEET/TU_HOJA";

const fallbackSales: Sale[] = [
  { id: 1, mes: "Enero", ventas: 1200 },
  { id: 2, mes: "Febrero", ventas: 1900 },
  { id: 3, mes: "Marzo", ventas: 1600 },
];

export async function fetchInitialSales(): Promise<Sale[]> {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);

    if (!response.ok) {
      throw new Error("No se pudo cargar Google Sheets");
    }

    const rows = await response.json();

    return rows.map((row: any, index: number) => ({
      id: index + 1,
      mes: row.mes || row.Mes || `Mes ${index + 1}`,
      ventas: Number(row.ventas || row.Ventas || 0),
    }));
  } catch {
    return fallbackSales;
  }
}