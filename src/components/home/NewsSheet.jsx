import React from "react";
import { SectionTitle } from "./CategoriesSheet";

const NewsSheet = React.memo(({ style, onNavigate }) => (
  <div style={style} className="sheet-content">
    <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
      <SectionTitle>Tin Tức & Kiến Thức Xây Dựng</SectionTitle>
      <div className="grid-news">
        {[
          { id: "guide-screws", title: "Hướng Dẫn Chọn Ốc Vít Đúng", desc: "Tìm hiểu cách chọn kích cỡ, chất liệu và độ bền phù hợp cho dự án của bạn.", date: "Tháng 1, 2026" },
          { id: "sustainable", title: "Xu Hướng Xây Dựng Bền Vững", desc: "Khám phá các phương pháp xây dựng hiện đại và thân thiện với môi trường.", date: "Tháng 1, 2026" },
          { id: "diy-maintenance", title: "Bảo Trì & Sửa Chữa DIY", desc: "Mẹo và thủ thuật duy trì nhà cửa với các công cụ chuyên dụng.", date: "Tháng 12, 2025" },
        ].map((article, idx) => (
          <div key={idx} style={{ position: "relative", background: "radial-gradient(circle at top, rgba(255,215,100,0.18), rgba(25,15,5,0.96))", border: "1px solid rgba(255,215,100,0.35)", padding: "1.8rem", cursor: "pointer", borderRadius: "18px", boxShadow: "0 18px 45px rgba(0,0,0,0.7)", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease" }} onClick={() => onNavigate(`/news/${article.id}`)} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 26px 60px rgba(255,215,100,0.4)"; e.currentTarget.style.borderColor = "rgba(255,235,180,0.95)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.7)"; e.currentTarget.style.borderColor = "rgba(255,215,100,0.35)"; }}>
            <p style={{ color: "rgba(255,215,100,0.6)", fontSize: "0.85rem", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{article.date}</p>
            <h3 style={{ fontSize: "1.1rem", color: "white", marginBottom: "0.75rem", lineHeight: 1.3 }}>{article.title}</h3>
            <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.4 }}>{article.desc}</p>
            <div style={{ marginTop: "1rem", color: "rgba(255,215,100,0.7)", fontSize: "0.9rem", fontWeight: 600 }}>Đọc thêm →</div>
          </div>
        ))}
      </div>
    </div>
  </div>
));

export default NewsSheet;
