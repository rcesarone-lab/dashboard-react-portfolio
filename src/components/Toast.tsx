import { useEffect } from "react";

type Props = {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#8b5cf6",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 18px",
        borderRadius: "12px",
        background: colors[type],
        color: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        zIndex: 9999,
        fontSize: "14px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {message}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
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