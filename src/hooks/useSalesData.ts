import { useEffect, useMemo, useState } from "react";
import type { Sale } from "../types/sales";
import { getSession } from "../services/authService";


const initialSales: Sale[] = [
  { id: 1, mes: "Enero", ventas: 1200 },
  { id: 2, mes: "Febrero", ventas: 1900 },
  { id: 3, mes: "Marzo", ventas: 1600 },
  { id: 4, mes: "Abril", ventas: 2200 },
];

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

type ToastType = "success" | "error" | "info";

export function useSalesData(
  showToast?: (message: string, type?: ToastType) => void
) {
  const session = getSession();
  const storageKey = `sales-data-${session?.id ?? "guest"}`;
  const [data, setData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        const parsedData = JSON.parse(stored) as Sale[];

        if (Array.isArray(parsedData)) {
          setData(parsedData);
        } else {
          setData(initialSales);
        }
      } catch {
        setData(initialSales);
      }
    } else {
      setData(initialSales);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, loading]);

  const metrics = useMemo(() => {
    const total = data.reduce((acc, item) => acc + item.ventas, 0);

    const monthsWithSales = data.filter((item) => item.ventas > 0);

    const average =
      monthsWithSales.length > 0
        ? Math.round(total / monthsWithSales.length)
        : 0;

    const bestMonth =
      monthsWithSales.length > 0
        ? monthsWithSales.reduce((max, item) =>
          item.ventas > max.ventas ? item : max
        )
        : null;

    const worstMonth =
      monthsWithSales.length > 0
        ? monthsWithSales.reduce((min, item) =>
          item.ventas < min.ventas ? item : min
        )
        : null;

    return {
      total,
      average,
      bestMonth,
      worstMonth,
      months: data.length,
      monthsWithSales: monthsWithSales.length,
    };
  }, [data]);

  const addMonth = () => {
    if (data.length >= 12) {
      showToast?.("Ya cargaste el año completo", "info");
      return;
    }

    const nextIndex = data.length;

    const nextMonth: Sale = {
      id: Date.now(),
      mes: months[nextIndex] ?? `Mes ${nextIndex + 1}`,
      ventas: 0,
    };

    setData((prev) => [...prev, nextMonth]);
    showToast?.("Mes agregado", "success");
  };

  const removeLastMonth = () => {
    if (data.length === 0) {
      showToast?.("No hay meses para eliminar", "info");
      return;
    }

    setData((prev) => prev.slice(0, -1));
    showToast?.("Último mes eliminado", "info");
  };

  const clearAll = () => {
    setData([]);
    localStorage.removeItem(storageKey);
    showToast?.("Datos limpiados", "info");
  };

  const updateSale = (id: number, ventas: number) => {
    if (ventas < 0) {
      showToast?.("Las ventas no pueden ser negativas", "error");
      return;
    }

    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ventas } : item))
    );
  };

  return {
    data,
    loading,
    metrics,
    addMonth,
    removeLastMonth,
    clearAll,
    updateSale,
  };
}