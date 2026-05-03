import type { Sale } from "../types/sales";

export function getTotalSales(data: Sale[]) {
  return data.reduce((acc, item) => acc + item.ventas, 0);
}

export function getAverageSales(data: Sale[]) {
  if (data.length === 0) return 0;
  return Math.floor(getTotalSales(data) / data.length);
}

export function getBestMonth(data: Sale[]) {
  if (data.length === 0) return null;
  return data.reduce((max, item) =>
    item.ventas > max.ventas ? item : max
  );
}

export function getWorstMonth(data: Sale[]) {
  if (data.length === 0) return null;
  return data.reduce((min, item) =>
    item.ventas < min.ventas ? item : min
  );
}
