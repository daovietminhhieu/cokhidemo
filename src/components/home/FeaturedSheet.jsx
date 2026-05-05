import React from "react";
import { SectionTitle } from "./CategoriesSheet";

const FeaturedSheet = React.memo(({ style, loading, products, featuredProductsList, language, onAddToCart, onNavigate, onShowPopup }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={style} className="sheet-content">
      <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <SectionTitle>Sản Phẩm Nổi Bật</SectionTitle>
        {loading ? (
          <div style={{ padding: "4rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
            <p>Đang tải sản phẩm...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ padding: "4rem", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
            <p>Chưa có sản phẩm nổi bật</p>
          </div>
        ) : (
          <div className="grid-products" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? "0.75rem" : "2rem",
            marginTop: "0px"
          }}>
            {featuredProductsList.map((product, idx) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  position: "relative",
                  background: "rgba(255, 255, 255, 0.03)",
                  padding: isMobile ? "0.75rem" : "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: isMobile ? "16px" : "24px",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column"
                }}
                onClick={() => onNavigate(`/shop/${encodeURIComponent(product.id)}`)}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.borderColor = "#10b981";
                    e.currentTarget.style.background = "rgba(16, 185, 129, 0.05)";
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
                {idx === 0 && (
                  <div style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "#ef4444",
                    color: "white",
                    padding: "0.2rem 0.5rem",
                    fontSize: "0.6rem",
                    borderRadius: "20px",
                    fontWeight: 700,
                    zIndex: 2
                  }}>
                    HOT
                  </div>
                )}
                <div style={{
                  aspectRatio: '1/1',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: isMobile ? '12px' : '16px',
                  marginBottom: isMobile ? '0.75rem' : '1.25rem',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                  />
                </div>
                <h3 style={{ fontSize: isMobile ? "0.85rem" : "1.1rem", fontWeight: 600, color: "white", marginBottom: '0.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {language === "vi" ? (product.name_vi || product.name) : product.name}
                </h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: isMobile ? "0.5rem" : "1rem", flexShrink: 0 }}>
                  <p style={{ color: "#10b981", fontWeight: 700, fontSize: isMobile ? "0.9rem" : "1.2rem", margin: 0 }}>
                    {product.price.toLocaleString()}đ
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    style={{
                      padding: isMobile ? "0.4rem 0.6rem" : "0.5rem 1rem",
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: isMobile ? "8px" : "12px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: isMobile ? "0.7rem" : "0.85rem"
                    }}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
});

export default FeaturedSheet;
