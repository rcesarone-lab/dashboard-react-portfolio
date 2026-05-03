import { useEffect, useState } from "react";

type Props = {
  title: string;
  value: number;
  theme: string;
};

export default function KPI({ title, value, theme }: Props) {
  const [highlight, setHighlight] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setHighlight(true);

    const timer = setTimeout(() => {
      setHighlight(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      style={{
        width: "220px",
        padding: "22px",
        borderRadius: "18px",
        background: highlight
          ? "rgba(139, 92, 246, 0.28)"
          : isDark
          ? "rgba(255, 255, 255, 0.10)"
          : "#ffffff",
        border: highlight
          ? "1px solid #8b5cf6"
          : isDark
          ? "1px solid rgba(255, 255, 255, 0.20)"
          : "1px solid #e5e7eb",
        boxShadow: highlight
          ? "0 0 28px rgba(139, 92, 246, 0.45)"
          : isDark
          ? "0 8px 30px rgba(0, 0, 0, 0.25)"
          : "0 8px 30px rgba(15, 23, 42, 0.12)",
        backdropFilter: "blur(12px)",
        color: isDark ? "#ffffff" : "#0f172a",
        transition: "all 0.25s ease",
        transform: highlight ? "scale(1.03)" : "scale(1)",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = highlight
          ? "scale(1.03)"
          : "scale(1)")
      }
    >
      <p
        style={{
          margin: 0,
          color: isDark ? "rgba(255,255,255,0.75)" : "#475569",
          fontSize: "16px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          margin: "12px 0 0 0",
          fontSize: "34px",
          letterSpacing: "-0.04em",
        }}
      >
        {value.toLocaleString()}
      </h2>
    </div>
  );
}