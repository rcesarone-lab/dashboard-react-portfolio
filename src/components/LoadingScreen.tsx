type Props = {
  theme: string;
};

export default function LoadingScreen({ theme }: Props) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark ? "#0f172a" : "#f8fafc",
        color: isDark ? "#ffffff" : "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
      }}
    >
      Cargando dashboard...
    </div>
  );
}