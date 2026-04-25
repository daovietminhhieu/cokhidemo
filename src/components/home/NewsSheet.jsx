import React from "react";
import { SectionTitle } from "./CategoriesSheet";

const NewsSheet = React.memo(({ style, onNavigate }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={style} className="sheet-content">
      <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <SectionTitle>Tin Tức Mới Nhất</SectionTitle>
        <div className="" style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: isMobile ? "0.75rem" : "2rem" 
        }}>
          {[
            { id: "guide-screws", title: "Hướng Dẫn Chọn Ốc Vít Đúng", desc: "Tìm hiểu cách chọn kích cỡ, chất liệu và độ bền phù hợp cho dự án của bạn.", date: "Tháng 1, 2026", color: "#f59e0b" },
            { id: "sustainable", title: "Xu Hướng Xây Dựng Bền Vững", desc: "Khám phá các phương pháp xây dựng hiện đại và thân thiện với môi trường.", date: "Tháng 1, 2026", color: "#10b981" },
            { id: "diy-maintenance", title: "Bảo Trì & Sửa Chữa DIY", desc: "Mẹo và thủ thuật duy trì nhà cửa với các công cụ chuyên dụng.", date: "Tháng 12, 2025", color: "#6366f1" },
          ].map((article, idx) => (
            <div 
              key={idx} 
              style={{ 
                position: "relative", 
                background: "rgba(255, 255, 255, 0.03)", 
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                padding: isMobile ? "1.25rem 1rem" : "2rem", 
                cursor: "pointer", 
                borderRadius: isMobile ? "16px" : "24px", 
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                backdropFilter: "blur(10px)",
                minHeight: isMobile ? "180px" : "auto",
                display: "flex",
                flexDirection: "column"
              }} 
              onClick={() => onNavigate(`/news/${article.id}`)} 
              onMouseEnter={(e) => { 
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-10px)"; 
                  e.currentTarget.style.borderColor = article.color;
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
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: article.color }} />
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{article.date}</p>
              </div>
              <h3 style={{ fontSize: isMobile ? "0.9rem" : "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.75rem", lineHeight: 1.4, flex: 1 }}>{article.title}</h3>
              {!isMobile && <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{article.desc}</p>}
              <div style={{ marginTop: "1rem", color: article.color, fontSize: isMobile ? "0.75rem" : "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {isMobile ? "Xem thêm" : "Chi tiết bài viết"} <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default NewsSheet;
