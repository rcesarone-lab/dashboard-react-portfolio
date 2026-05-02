type Props = {
  title: string;
  value: number;
  theme: string;
};

export default function KPI({ title, value, theme }: Props) {
  return (
    <div
      style={{
        width: "160px",
        padding: "18px",
        borderRadius: "16px",
        background:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.10)"
            : "#ffffff",
        border:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.20)"
            : "1px solid #e5e7eb",
        boxShadow:
          theme === "dark"
            ? "0 8px 30px rgba(0, 0, 0, 0.25)"
            : "0 8px 30px rgba(15, 23, 42, 0.12)",
        backdropFilter: "blur(12px)",
        color: theme === "dark" ? "#ffffff" : "#0f172a",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      <p
        style={{
          margin: 0,
          color:
            theme === "dark"
              ? "rgba(255,255,255,0.75)"
              : "#475569",
        }}
      >
        {title}
      </p>

      <h2 style={{ margin: "12px 0 0 0", fontSize: "30px" }}>
        {value}
      </h2>
    </div>
  );
}