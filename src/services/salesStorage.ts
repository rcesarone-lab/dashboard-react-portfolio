import type { Sale, TabId, Theme } from "../types/sales";

const SALES_KEY = "ventas";
const TAB_KEY = "tab";
const THEME_KEY = "theme";

export function getStoredSales(): Sale[] | null {
  const raw = localStorage.getItem(SALES_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as Sale[];
  } catch {
    localStorage.removeItem(SALES_KEY);
    return null;
  }
}

export function saveSales(data: Sale[]) {
  localStorage.setItem(SALES_KEY, JSON.stringify(data));
}

export function clearSales() {
  localStorage.removeItem(SALES_KEY);
}

export function getStoredTab(): TabId {
  const tab = localStorage.getItem(TAB_KEY);
  return tab === "ventas" || tab === "analisis" || tab === "config"
    ? tab
    : "ventas";
}

export function saveTab(tab: TabId) {
  localStorage.setItem(TAB_KEY, tab);
}

export function getStoredTheme(): Theme {
  const theme = localStorage.getItem(THEME_KEY);
  return theme === "light" ? "light" : "dark";
}

export function saveTheme(theme: Theme) {
  localStorage.setItem(THEME_KEY, theme);
}
