import React from "react";
import { SectionTitle } from "./CategoriesSheet";

const AdvantagesSheet = React.memo(({ style, t }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={style} className="sheet-content">
      <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <SectionTitle>Ưu Điểm Dịch Vụ</SectionTitle>
        <div className="" style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: isMobile ? "0.75rem" : "2rem" 
        }}>
          {[
            { title: t("choose_durable"), desc: t("choose_durable_desc"), num: "01", color: "#ef4444" },
            { title: t("choose_precision"), desc: t("choose_precision_desc"), num: "02", color: "#10b981" },
            { title: t("choose_shipping"), desc: t("choose_shipping_desc"), num: "03", color: "#3b82f6" },
          ].map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                position: "relative", 
                padding: isMobile ? "1.25rem" : "2.5rem 2rem", 
                borderRadius: isMobile ? "16px" : "24px", 
                background: "rgba(255, 255, 255, 0.03)", 
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                overflow: "hidden",
                minHeight: isMobile ? "160px" : "auto"
              }} 
              onMouseEnter={(e) => { 
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-10px)"; 
                  e.currentTarget.style.borderColor = item.color;
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }
              }} 
              onMouseLeave={(e) => { 
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)"; 
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                }
              }}
            >
              <div style={{ 
                fontSize: isMobile ? "2.5rem" : "4rem", 
                fontWeight: 900, 
                color: item.color, 
                opacity: 0.15, 
                position: "absolute", 
                top: isMobile ? "0.25rem" : "-0.5rem", 
                right: isMobile ? "0.5rem" : "1rem",
                fontFamily: "'Audiowide', sans-serif"
              }}>
                {item.num}
              </div>
              <h3 style={{ fontSize: isMobile ? "1rem" : "1.35rem", fontWeight: 700, marginBottom: isMobile ? "0.5rem" : "1rem", color: "white" }}>{item.title}</h3>
              <p style={{ fontSize: isMobile ? "0.8rem" : "1rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default AdvantagesSheet;
