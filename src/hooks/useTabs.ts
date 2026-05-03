import { useEffect, useState } from "react";

export type TabKey = "ventas" | "analisis" | "configuracion";

const TAB_STORAGE_KEY = "active-tab";

export function useTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("ventas");

  useEffect(() => {
    const savedTab = localStorage.getItem(TAB_STORAGE_KEY);

    if (
      savedTab === "ventas" ||
      savedTab === "analisis" ||
      savedTab === "configuracion"
    ) {
      setActiveTab(savedTab);
    }
  }, []);

  function changeTab(tab: TabKey) {
    setActiveTab(tab);
    localStorage.setItem(TAB_STORAGE_KEY, tab);
  }

  return {
    activeTab,
    changeTab,
  };
}