import React, { useState, useEffect } from 'react';

export default function FacebookButton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: isMobile ? "20px" : "30px",
      right: isMobile ? "20px" : "30px",
      zIndex: 900,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <a 
        href="https://www.facebook.com/share/1JB1EjUa6R/?mibextid=wwXIfr" 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          width: isMobile ? "50px" : "60px", 
          height: isMobile ? "50px" : "60px", 
          borderRadius: "50%", 
          background: "rgba(255, 255, 255, 0.05)", 
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)", 
          color: "#1877F2", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", 
          transition: "all 0.3s ease",
          textDecoration: "none",
          cursor: "pointer"
        }}
        title="Theo dõi chúng tôi trên Facebook"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(24, 119, 242, 0.1)";
          e.currentTarget.style.border = "1px solid rgba(24, 119, 242, 0.4)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(24, 119, 242, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={isMobile ? "24" : "30"} height={isMobile ? "24" : "30"} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" /></svg>
      </a>
    </div>
  );
}
