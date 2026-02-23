import React from "react";
import Reveal from "../components/Reveal";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function News() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const articles =
    language === "vi"
      ? [
          {
            id: "guide-screws",
            date: "Tháng 1, 2026",
            title: "Hướng Dẫn Chọn Ốc Vít Đúng",
            desc:
              "Cách chọn kích cỡ, vật liệu và tiêu chuẩn phù hợp cho từng ứng dụng xây dựng.",
          },
          {
            id: "sustainable",
            date: "Tháng 1, 2026",
            title: "Xu Hướng Xây Dựng Bền Vững",
            desc:
              "Vật liệu và phương pháp thi công giúp tối ưu chi phí và giảm tác động môi trường.",
          },
          {
            id: "diy-maintenance",
            date: "Tháng 12, 2025",
            title: "Bảo Trì & Sửa Chữa DIY",
            desc:
              "Những lưu ý khi sử dụng dụng cụ cơ khí cho công việc gia đình an toàn và hiệu quả.",
          },
        ]
      : [
          {
            id: "guide-screws",
            date: "Jan 2026",
            title: "Guide to Choosing the Right Screws",
            desc:
              "Pick the right size, material, and standard for each construction use-case.",
          },
          {
            id: "sustainable",
            date: "Jan 2026",
            title: "Sustainable Building Trends",
            desc:
              "Materials and methods that optimize costs and reduce environmental impact.",
          },
          {
            id: "diy-maintenance",
            date: "Dec 2025",
            title: "DIY Maintenance & Repair",
            desc:
              "Safety tips and best practices for using hardware tools at home.",
          },
        ];

  return (
    <div className="container section" style={{ marginTop: "60px", marginBottom: "60px" }}>
      <Reveal width="100%">
        <h1 style={{ color: "white", marginBottom: "1rem" }}>
          {language === "vi" ? "Tin Tức & Kiến Thức" : "News & Knowledge"}
        </h1>
      </Reveal>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {articles.map((a) => (
          <div
            key={a.id}
            className="glass"
            style={{
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
            onClick={() => navigate(`/news/${a.id}`)}
          >
            <p style={{ color: "#c8b26a", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.04em" }}>
              {a.date}
            </p>
            <h3 style={{ color: "white", margin: "0.5rem 0" }}>{a.title}</h3>
            <p style={{ color: "#aaa", lineHeight: 1.5 }}>{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
