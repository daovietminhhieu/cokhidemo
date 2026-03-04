/** ========= REPORT =========
 * Sửa lại cấu trúc trang Home
 * 
 * ....
 * 
 * Giới thiệu về cửa hàng 
 */




import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Experience from "../components/Experience";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import Marquee from "../components/Marquee";
import { getAssetProducts } from "../data/assetsProducts";
import { SeoTags } from "../seo/SeoTags";
import PullToReveal from "../components/PullToReveal";
import FeaturedProductPopup from "../components/FeaturedProductPopup";
import imgOcvit from "../assets/ocvit_bovitinoxhopnhua.webp";
import imgVatlieu from "../assets/vatlieu_thepu.webp";
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
  const products = useMemo(() => getAssetProducts(), []);
  const [hoveredCharIndex, setHoveredCharIndex] = useState(-1);
  const [showProductPopup, setShowProductPopup] = useState(false);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Auto-show featured products popup after delay
  useEffect(() => {
    const hiddenToday = localStorage.getItem('hideFeaturedPopup');
    const today = new Date().toDateString();
    
    // Only show if not hidden today
    if (hiddenToday !== today) {
      const timer = setTimeout(() => {
        setShowProductPopup(true);
      }, 10000); // Show after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  const sheetStyle = {
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: isMobile ? "0.8rem 1rem 1.2rem" : "1.4rem 0",
    background: "rgba(10, 10, 10, 0.4)",
    backdropFilter: isMobile ? "none" : "blur(6px)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    position: "relative",
    boxSizing: "border-box",
    boxShadow: isMobile ? "none" : "0 -10px 28px rgba(0,0,0,0.7)",
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
    borderLeft: isMobile ? "none" : "4px solid rgba(80, 90, 100, 0.6)",
  };

  const sheet3Style = {
    ...sheetStyle,
    background:
      "linear-gradient(135deg, rgba(20, 30, 40, 0.5) 0%, rgba(10, 10, 10, 0.5) 100%)",
    borderLeft: isMobile ? "none" : "4px solid rgba(80, 90, 100, 0.6)",
    marginTop: isMobile ? "0.2rem" : 0,
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
    marginBottom: "0.6rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
  };

  return (
      <div>
      <SeoTags
        title={language === "vi" ? "Trang chủ" : "Home"}
        description={t("seo_home_desc") || "Khám phá kho cơ khí, inox, ốc vít và vật liệu xây dựng với trải nghiệm 3D sống động."}
      />
      {/* CHAPTER 1: THE VISUAL STORY (3D Background) */}
      {/* Fixed position, scrubs based on total page scroll */}
      <div
        className="home-3d"
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
          <div style={{...sheet1Style, marginTop: isMobile ? "0" : "10vh"}} className="sheet-content">
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
                    key: "dungcu",
                  },
                ].map((cat, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      background:
                        "radial-gradient(circle at top, rgba(100,200,255,0.18), rgba(5,10,20,0.95))",
                      border: "1px solid rgba(100,200,255,0.35)",
                      padding: "2rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
                      overflow: "hidden",
                      borderRadius: "18px",
                      boxShadow: "0 18px 45px rgba(0,0,0,0.6)",
                    }}
                    onClick={() => navigate(`/shop?category=${encodeURIComponent(cat.key)}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                      e.currentTarget.style.boxShadow = "0 26px 60px rgba(0, 200, 255, 0.35)";
                      e.currentTarget.style.borderColor = "rgba(150,230,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.6)";
                      e.currentTarget.style.borderColor = "rgba(100,200,255,0.35)";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: "-40%",
                        background:
                          "radial-gradient(circle at 0% 0%, rgba(0,220,255,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.05), transparent 55%)",
                        opacity: 0.6,
                        pointerEvents: "none",
                      }}
                    />

                    <div
                      style={{
                        height: "170px",
                        marginBottom: "0",
                        overflow: "hidden",
                        borderRadius: "4px",
                        position: "relative",
                      }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        loading="lazy"
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transform: "translateZ(0) scale(1.02)",
                          transition: "transform 0.6s ease",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.0) 60%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: "12px",
                          right: "12px",
                          bottom: "10px",
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                            fontWeight: 700,
                            lineHeight: 1.2,
                            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                          }}
                        >
                          {cat.name}
                        </div>
                        <div
                          style={{
                            fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                            opacity: 0.8,
                          }}
                        >
                          {cat.count} sản phẩm
                        </div>
                      </div>
                    </div>
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
                      position: "relative",
                      background:
                        "radial-gradient(circle at top, rgba(144,238,144,0.18), rgba(10,20,10,0.95))",
                      padding: "1.5rem",
                      border: "1px solid rgba(144,238,144,0.4)",
                      position: "relative",
                      borderRadius: "18px",
                      boxShadow: "0 18px 45px rgba(0,0,0,0.7)",
                      overflow: "hidden",
                      transition:
                        "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-10px) scale(1.03)";
                      e.currentTarget.style.boxShadow =
                        "0 26px 60px rgba(144,238,144,0.35)";
                      e.currentTarget.style.borderColor =
                        "rgba(200,255,200,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 45px rgba(0,0,0,0.7)";
                      e.currentTarget.style.borderColor =
                        "rgba(144,238,144,0.4)";
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
                      {language === "vi" ? (product.name_vi || product.name) : product.name}
                    </h3>
                    <p style={{ color: "var(--accent)", fontWeight: "bold" }}>
                      {product.price} vnd
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

              {/* Button to Open Featured Products Popup */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2.5rem",
                }}
              >
                <button
                  onClick={() => setShowProductPopup(true)}
                  style={{
                    padding: "1rem 2.5rem",
                    background: "linear-gradient(135deg, rgba(100, 200, 100, 0.8), rgba(144, 238, 144, 0.6))",
                    color: "white",
                    border: "1px solid rgba(144, 238, 144, 0.4)",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "linear-gradient(135deg, rgba(144, 238, 144, 0.9), rgba(200, 255, 200, 0.7))";
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 10px 30px rgba(144, 238, 144, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "linear-gradient(135deg, rgba(100, 200, 100, 0.8), rgba(144, 238, 144, 0.6))";
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  👀 Xem Tất Cả Sản Phẩm Nổi Bật
                </button>
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
                      position: "relative",
                      borderLeft: "2px solid rgba(255,107,107,0.6)",
                      paddingLeft: "2rem",
                      paddingTop: "1.5rem",
                      paddingBottom: "1.5rem",
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, rgba(80,20,20,0.7), rgba(10,10,15,0.95))",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.8)",
                      overflow: "hidden",
                      transition:
                        "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-8px) scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 26px 60px rgba(255,107,107,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 40px rgba(0,0,0,0.8)";
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
                      position: "relative",
                      background:
                        "radial-gradient(circle at top, rgba(255,215,100,0.18), rgba(25,15,5,0.96))",
                      border: "1px solid rgba(255,215,100,0.35)",
                      padding: "1.8rem",
                      cursor: "pointer",
                      borderRadius: "18px",
                      boxShadow: "0 18px 45px rgba(0,0,0,0.7)",
                      transition:
                        "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease",
                    }}
                    onClick={() => navigate(`/news/${article.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-10px) scale(1.03)";
                      e.currentTarget.style.boxShadow =
                        "0 26px 60px rgba(255,215,100,0.4)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,235,180,0.95)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 18px 45px rgba(0,0,0,0.7)";
                      e.currentTarget.style.borderColor =
                        "rgba(255,215,100,0.35)";
                    }}
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

      {/* Floating Action Button - Featured Products */}
      <button
        onClick={() => setShowProductPopup(true)}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(144, 238, 144, 0.8), rgba(100, 200, 100, 0.9))",
          border: "2px solid rgba(144, 238, 144, 0.6)",
          color: "white",
          fontSize: "1.8rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(144, 238, 144, 0.4)",
          transition: "all 0.3s ease",
          zIndex: 900,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.15) translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(144, 238, 144, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(144, 238, 144, 0.4)";
        }}
        title="Xem sản phẩm nổi bật"
      >
        ✨
      </button>

      {/* Featured Products Popup */}
      <FeaturedProductPopup
        isOpen={showProductPopup}
        onClose={() => setShowProductPopup(false)}
        onDontShowAgain={() => setShowProductPopup(false)}
        products={products.slice(0, 4)}
      />
    </div>
  );
}
