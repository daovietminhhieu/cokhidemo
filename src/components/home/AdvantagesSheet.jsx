import React from "react";
import { SectionTitle } from "./CategoriesSheet";

const AdvantagesSheet = React.memo(({ style, t }) => (
  <div style={style} className="sheet-content">
    <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
      <SectionTitle>Ưu Điểm Dịch Vụ</SectionTitle>
      <div className="grid-features">
        {[
          { title: t("choose_durable"), desc: t("choose_durable_desc"), num: "01" },
          { title: t("choose_precision"), desc: t("choose_precision_desc"), num: "02" },
          { title: t("choose_shipping"), desc: t("choose_shipping_desc"), num: "03" },
        ].map((item, idx) => (
          <div key={idx} style={{ position: "relative", borderLeft: "2px solid rgba(255,107,107,0.6)", paddingLeft: "2rem", paddingTop: "1.5rem", paddingBottom: "1.5rem", borderRadius: "14px", background: "linear-gradient(135deg, rgba(80,20,20,0.7), rgba(10,10,15,0.95))", boxShadow: "0 18px 40px rgba(0,0,0,0.8)", overflow: "hidden", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 26px 60px rgba(255,107,107,0.45)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.8)"; }}>
            <span style={{ fontSize: "3rem", fontWeight: 800, color: "rgba(255,107,107,0.6)", display: "block", lineHeight: 1, marginBottom: "1rem" }}>{item.num}</span>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "white" }}>{item.title}</h3>
            <p style={{ color: "#888" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
));

export default AdvantagesSheet;
