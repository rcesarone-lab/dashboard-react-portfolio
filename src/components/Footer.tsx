export default function Footer() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "24px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "13px",
        color: "rgba(255,255,255,0.7)",
        animation: "fadeIn 1.2s ease-in-out",
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#fff",
          boxShadow: "0 0 10px rgba(139,92,246,0.6)",
        }}
      >
        CR
      </div>

      {/* Texto + link */}
      <a
        href="https://github.com/rcesarone-lab"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "rgba(255,255,255,0.8)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "#8b5cf6")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "rgba(255,255,255,0.8)")
        }
      >
        Powered by CRamirez
      </a>

      {/* Animación */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}