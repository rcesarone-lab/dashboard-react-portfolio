export default function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        right: "24px",
        bottom: "18px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "rgba(255,255,255,0.75)",
        fontSize: "14px",
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          background: "#8b5cf6",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.65)",
        }}
      >
        CR
      </div>

      <span>CRamirez FrontEnd Developper</span>
    </footer>
  );
}