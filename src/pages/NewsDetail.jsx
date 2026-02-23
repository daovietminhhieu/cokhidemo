import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useLanguage } from "../context/LanguageContext";

function getArticles(language) {
  if (language === "vi") {
    return {
      "guide-screws": {
        title: "Hướng Dẫn Chọn Ốc Vít Đúng",
        date: "Tháng 1, 2026",
        content: [
          "Lựa chọn ốc vít phù hợp phụ thuộc vào vật liệu nền (gỗ, kim loại, bê tông), môi trường sử dụng (trong nhà, ngoài trời, ăn mòn), và tiêu chuẩn lắp ghép.",
          "Kích cỡ: xác định đường kính, chiều dài và bước ren. Với gỗ và tấm, ưu tiên ren thưa; với kim loại, chọn ren mịn chuẩn hệ mét.",
          "Vật liệu: Inox 304/316 cho môi trường ẩm hoặc ăn mòn; thép mạ kẽm cho chi phí hợp lý; đồng thau cho yêu cầu mỹ thuật.",
          "Khuyến nghị: dùng long đền phù hợp để phân bổ lực siết, tránh lỏng; sử dụng moment siết đúng để bảo vệ chi tiết.",
        ],
      },
      sustainable: {
        title: "Xu Hướng Xây Dựng Bền Vững",
        date: "Tháng 1, 2026",
        content: [
          "Xây dựng bền vững hướng đến tối ưu tài nguyên, giảm phát thải và tăng tuổi thọ công trình.",
          "Vật liệu: ưu tiên thép tái chế, vật liệu có chứng nhận EPD, sơn và keo ít VOC.",
          "Thi công: dùng liên kết cơ khí dễ tháo lắp để tái sử dụng; tối ưu vận chuyển và lắp đặt để giảm năng lượng.",
          "Vận hành: bảo trì định kỳ, giám sát độ lỏng của bulong ở các vị trí chịu rung động.",
        ],
      },
      "diy-maintenance": {
        title: "Bảo Trì & Sửa Chữa DIY",
        date: "Tháng 12, 2025",
        content: [
          "Luôn sử dụng bảo hộ: kính, găng tay và giày phù hợp.",
          "Chọn dụng cụ đúng mục đích: bu-lông/ốc vít nên dùng cờ lê, khẩu đúng kích cỡ để tránh tòe đầu vít.",
          "Đánh dấu và phân loại chi tiết trước khi tháo: hộp đựng, nhãn rõ ràng để lắp lại dễ dàng.",
          "Sau khi hoàn thành, kiểm tra lực siết và độ thẳng hàng để đảm bảo an toàn.",
        ],
      },
    };
  }

  return {
    "guide-screws": {
      title: "Guide to Choosing the Right Screws",
      date: "Jan 2026",
      content: [
        "Choose based on base material (wood, metal, concrete), environment (indoor, outdoor, corrosive) and assembly standards.",
        "Sizing: determine diameter, length and thread pitch. For wood/sheet use coarse threads; for metals choose fine metric threads.",
        "Material: Stainless 304/316 for humid or corrosive environments; zinc-plated steel for cost efficiency; brass for aesthetics.",
        "Use matching washers and correct torque to prevent loosening and protect components.",
      ],
    },
    sustainable: {
      title: "Sustainable Building Trends",
      date: "Jan 2026",
      content: [
        "Sustainable construction optimizes resources, lowers emissions and extends building life.",
        "Materials: recycled steel, products with EPD, low-VOC paints and adhesives.",
        "Methods: mechanical fasteners for reuse; optimized logistics and installation to cut energy.",
        "Operation: periodic maintenance and preload checks on fasteners in high-vibration zones.",
      ],
    },
    "diy-maintenance": {
      title: "DIY Maintenance & Repair",
      date: "Dec 2025",
      content: [
        "Always wear PPE: goggles, gloves, and appropriate footwear.",
        "Use proper tools: match wrench/socket sizes to avoid stripping heads.",
        "Label and organize parts during disassembly for easy reassembly.",
        "After finishing, verify torque and alignment to ensure safety.",
      ],
    },
  };
}

export default function NewsDetail() {
  const { language } = useLanguage();
  const { articleId } = useParams();
  const articles = useMemo(() => getArticles(language), [language]);
  const article = articles[articleId || ""] || null;

  if (!article) {
    return (
      <div className="container section" style={{ marginTop: "60px", minHeight: "70vh" }}>
        <Reveal width="100%">
          <h1 style={{ color: "white", marginBottom: "1rem" }}>
            {language === "vi" ? "Không tìm thấy bài viết" : "Article not found"}
          </h1>
        </Reveal>
        <Link to="/news" style={{ color: "#fff", textDecoration: "underline" }}>
          {language === "vi" ? "← Quay lại Tin Tức" : "← Back to News"}
        </Link>
      </div>
    );
  }

  return (
    <div className="container section" style={{ marginTop: "60px", marginBottom: "60px" }}>
      <Reveal width="100%">
        <div style={{ maxWidth: "900px", margin: "0 auto", color: "white" }}>
          <div style={{ marginBottom: "1rem" }}>
            <Link to="/news" style={{ color: "#aaa", textDecoration: "none" }}>
              {language === "vi" ? "← Tin Tức" : "← News"}
            </Link>
          </div>
          <p style={{ color: "#c8b26a", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {article.date}
          </p>
          <h1 style={{ fontSize: "2.4rem", margin: "0.4rem 0 1rem" }}>{article.title}</h1>
          <div style={{ color: "#bbb", lineHeight: 1.7 }}>
            {article.content.map((p, idx) => (
              <p key={idx} style={{ marginBottom: "1rem" }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
