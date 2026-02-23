import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Experience from "../components/Experience";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import Marquee from "../components/Marquee";
import { PRODUCTS } from "../data/mockData";
import PullToReveal from "../components/PullToReveal";
import imgOcvit from "../assets/ocvit_bovitinoxhopnhua.webp";
// import imgPhukien from "../assets/.jpg";
import imgVatlieu from "../assets/vatlieu_thepu.webp"
import imgKhoa from "../assets/khoa_vachot3.jfif";
import imgCongcu from "../assets/dungcucokhi_botuocnovit.png";

// Minimalist components inline
const SectionTitle = ({ children }) => (
  <h2
    style={{
      fontSize: "clamp(2rem, 5vw, 4rem)",
      textTransform: "uppercase",
      marginBottom: "2rem",
      borderTop: "1px solid rgba(255,255,255,0.2)",
      paddingTop: "1rem",
      color: "white",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
      fontWeight: 600,
      letterSpacing: "0.05em",
    }}
  >
    {children}
  </h2>
);

export default function Home() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const products = PRODUCTS;
  const [hoveredCharIndex, setHoveredCharIndex] = useState(-1);
  const navigate = useNavigate();

  const sheetStyle = {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "4rem",
    background: "rgba(10, 10, 10, 0.4)",
    backdropFilter: "blur(8px)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    boxSizing: "border-box",
    boxShadow: "0 -20px 50px rgba(0,0,0,0.8)",
  };

  const sheet1Style = {
    ...sheetStyle,
    background:
      "linear-gradient(135deg, rgba(10, 10, 10, 0.5) 0%, rgba(15, 25, 35, 0.5) 100%)",
    borderLeft: "4px solid rgba(80, 90, 100, 0.6)",
  };

  const sheet2Style = {
    ...sheetStyle,
    background:
      "linear-gradient(135deg, rgba(15, 25, 35, 0.5) 0%, rgba(20, 30, 40, 0.5) 100%)",
    borderLeft: "4px solid rgba(80, 90, 100, 0.6)",
  };

  const sheet3Style = {
    ...sheetStyle,
    background:
      "linear-gradient(135deg, rgba(20, 30, 40, 0.5) 0%, rgba(10, 10, 10, 0.5) 100%)",
    borderLeft: "4px solid rgba(80, 90, 100, 0.6)",
  };

  const sheet4Style = {
    ...sheetStyle,
    background:
      "linear-gradient(135deg, rgba(10, 15, 25, 0.5) 0%, rgba(25, 15, 35, 0.5) 100%)",
    borderLeft: "4px solid rgba(80, 90, 100, 0.6)",
  };

  const sheet5Style = {
    ...sheetStyle,
    background:
      "linear-gradient(135deg, rgba(25, 15, 35, 0.5) 0%, rgba(15, 25, 35, 0.5) 100%)",
    borderLeft: "4px solid rgba(80, 90, 100, 0.6)",
  };

  const sectionLabel = {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.4)",
    marginBottom: "1rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
  };

  return (
    <div>
      {/* CHAPTER 1: THE VISUAL STORY (3D Background) */}
      {/* Fixed position, scrubs based on total page scroll */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>

      {/* STATIC GRADIENT BASE */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          background:
            "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)",
        }}
      />

      {/* CHAPTER 2: THE CONTENT LAYERS (Story Sheets) */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <PullToReveal>
          {/* SHEET 1: INTRO - "The Standard" */}
          <div style={sheet1Style} className="sheet-content">
            <div
              className="container"
              style={{ position: "relative", zIndex: 2, userSelect: "none" }}
            >
              <div style={{ opacity: 1 }}>

                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    width: "100%",
                    perspective: "1000px",
                  }}
                >


                  <h1
                    style={{
                      fontSize: "15vw",
                      lineHeight: 0.8,
                      letterSpacing: "-0.02em",
                      color: "white",
                      margin: "0 0 1rem 0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                      fontFamily: "'Black Ops One', cursive",
                      textTransform: "uppercase",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {"Hardware".split("").map((char, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: "inline-block",
                          transition:
                            "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          transform:
                            hoveredCharIndex === idx
                              ? `translateY(-15px)`
                              : "translateY(0)",
                          animationName:
                            hoveredCharIndex !== idx ? "float-subtle" : "none",
                          animationDuration: "3s",
                          animationTimingFunction: "ease-in-out",
                          animationIterationCount: "infinite",
                          animationDelay: `${idx * 0.1}s`,
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => setHoveredCharIndex(idx)}
                        onMouseLeave={() => setHoveredCharIndex(-1)}
                      >
                        {char}
                      </span>
                    ))}
                  </h1>


                </div>
                <h1
                  style={{
                    fontSize: "6vw",
                    lineHeight: 0.8,
                    letterSpacing: "-0.05em",
                    color: "transparent",
                    WebkitTextStroke: "2px white",
                    margin: 0,
                  }}
                >
                  {t("shop_tagline")}
                </h1>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8vh",
                  alignItems: "flex-end",
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  paddingTop: "2rem",
                }}
              >
                <p
                  style={{
                    maxWidth: "400px",
                    fontSize: "1.25rem",
                    color: "var(--secondary)",
                    lineHeight: 1.4,
                  }}
                >
                  {t("hero_desc")}
                </p>
                <Link to="/shop" className="btn-primary">
                  {t("hero_cta")}
                </Link>
              </div>
            </div>
          </div>

          {/* SHEET 2: PRODUCT CATEGORIES */}
          <div style={sheet2Style} className="sheet-content">
            <div
              className="container"
              style={{ width: "100%", position: "relative", zIndex: 2 }}
            >
              <SectionTitle>Danh Mục Sản Phẩm Chính</SectionTitle>
              <div className="grid-products">
                {[
                  {
                    name: "Ốc Vít - Bu Lông - Phụ kiện ren",
                    image: imgOcvit,
                    count: "2,500+",
                    key: "ocvit",
                  },
                  {
                    name: "Vật liệu cơ khí",
                    image: imgVatlieu,
                    count: "1,800+",
                    key: "vatlieu",
                  },
                  {
                    name: "Khóa & Chốt",
                    image: imgKhoa,
                    count: "900+",
                    key: "khoa",
                  },
                  {
                    name: "Công Cụ & Dụng Cụ",
                    image: imgCongcu,
                    count: "1,200+",
                    key: "congcu",
                  },
                ].map((cat, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(100,200,255,0.05)",
                      border: "1px solid rgba(100,200,255,0.2)",
                      padding: "2rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                    }}
                    onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.key)}`)}
                  >
                    <div
                      style={{
                        height: "150px",
                        marginBottom: "1rem",
                        overflow: "hidden",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        color: "white",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>
                      {cat.count} sản phẩm
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SHEET 3: FEATURED PRODUCTS */}
          <div style={sheet3Style} className="sheet-content">
            <div
              className="container"
              style={{ width: "100%", position: "relative", zIndex: 2 }}
            >
              <SectionTitle>Sản Phẩm Nổi Bật & Khuyến Mãi</SectionTitle>

              <div className="grid-products">
                {products.slice(0, 4).map((product, idx) => (
                  <div
                    key={product.id}
                    className="product-card"
                    style={{
                      background: "rgba(144,238,144,0.05)",
                      padding: "1rem",
                      border: "1px solid rgba(144,238,144,0.2)",
                      position: "relative",
                    }}
                  >
                    {idx === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "10px",
                          background: "rgba(255,107,107,0.8)",
                          color: "white",
                          padding: "0.3rem 0.7rem",
                          fontSize: "0.75rem",
                          borderRadius: "2px",
                          fontWeight: "bold",
                        }}
                      >
                        -20%
                      </div>
                    )}
                    <h3 style={{ fontSize: "1.2rem", color: "white" }}>
                      {language === "vi" ? product.name : product.name}
                    </h3>
                    <p style={{ color: "var(--accent)", fontWeight: "bold" }}>
                      ${product.price}
                    </p>
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        marginTop: "0.5rem",
                        padding: "0.5rem 1rem",
                        background: "white",
                        color: "black",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Thêm Vào Giỏ
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SHEET 4: SERVICE ADVANTAGES */}
          <div style={sheet4Style} className="sheet-content">
            <div
              className="container"
              style={{ width: "100%", position: "relative", zIndex: 2 }}
            >
              <SectionTitle>Ưu Điểm Dịch Vụ</SectionTitle>
              <div className="grid-features">
                {[
                  {
                    title: t("choose_durable"),
                    desc: t("choose_durable_desc"),
                    num: "01",
                  },
                  {
                    title: t("choose_precision"),
                    desc: t("choose_precision_desc"),
                    num: "02",
                  },
                  {
                    title: t("choose_shipping"),
                    desc: t("choose_shipping_desc"),
                    num: "03",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderLeft: "2px solid rgba(255,107,107,0.3)",
                      paddingLeft: "2rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "3rem",
                        fontWeight: 800,
                        color: "rgba(255,107,107,0.6)",
                        display: "block",
                        lineHeight: 1,
                        marginBottom: "1rem",
                      }}
                    >
                      {item.num}
                    </span>
                    <h3
                      style={{
                        fontSize: "1.2rem",
                        marginBottom: "1rem",
                        color: "white",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "#888" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SHEET 5: KNOWLEDGE & NEWS */}
          <div style={sheet5Style} className="sheet-content">
            <div
              className="container"
              style={{ width: "100%", position: "relative", zIndex: 2 }}
            >
              <SectionTitle>Tin Tức & Kiến Thức Xây Dựng</SectionTitle>
              <div className="grid-news">
                {[
                  {
                    id: "guide-screws",
                    title: "Hướng Dẫn Chọn Ốc Vít Đúng",
                    desc: "Tìm hiểu cách chọn kích cỡ, chất liệu và độ bền phù hợp cho dự án của bạn.",
                    date: "Tháng 1, 2026",
                  },
                  {
                    id: "sustainable",
                    title: "Xu Hướng Xây Dựng Bền Vững",
                    desc: "Khám phá các phương pháp xây dựng hiện đại và thân thiện với môi trường.",
                    date: "Tháng 1, 2026",
                  },
                  {
                    id: "diy-maintenance",
                    title: "Bảo Trì & Sửa Chữa DIY",
                    desc: "Mẹo và thủ thuật duy trì nhà cửa với các công cụ chuyên dụng.",
                    date: "Tháng 12, 2025",
                  },
                ].map((article, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255,215,100,0.05)",
                      border: "1px solid rgba(255,215,100,0.15)",
                      padding: "1.5rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => navigate(`/news/${article.id}`)}
                  >
                    <p
                      style={{
                        color: "rgba(255,215,100,0.6)",
                        fontSize: "0.85rem",
                        marginBottom: "0.5rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {article.date}
                    </p>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        color: "white",
                        marginBottom: "0.75rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {article.title}
                    </h3>
                    <p
                      style={{
                        color: "#888",
                        fontSize: "0.95rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {article.desc}
                    </p>
                    <div
                      style={{
                        marginTop: "1rem",
                        color: "rgba(255,215,100,0.7)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      Đọc thêm →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PullToReveal>
      </div>
    </div>
  );
}
