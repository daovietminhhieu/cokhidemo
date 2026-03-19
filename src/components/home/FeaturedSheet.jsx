import React from "react";
import { SectionTitle } from "./CategoriesSheet";

const FeaturedSheet = React.memo(({ style, loading, products, featuredProductsList, language, onAddToCart, onNavigate, onShowPopup }) => (
  <div style={style} className="sheet-content">
    <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
      <SectionTitle>Sản Phẩm Nổi Bật & Khuyến Mãi</SectionTitle>
      {loading ? (
        <div style={{ padding: "8rem", color: "#666", textAlign: "center", minHeight: "600px" }}>
          <div className="loader-dots">Loading products...</div>
        </div>
      ) : products.length === 0 ? (
        <div style={{ padding: "8rem", color: "#666", textAlign: "center", minHeight: "600px" }}>
          <h3>Chưa có sản phẩm nổi bật</h3>
        </div>
      ) : (
        <div className="grid-products">
          {featuredProductsList.map((product, idx) => (
            <div key={product.id} className="product-card" style={{ position: "relative", background: "radial-gradient(circle at top, rgba(144,238,144,0.18), rgba(10,20,10,0.95))", padding: "1.5rem", border: "1px solid rgba(144,238,144,0.4)", borderRadius: "18px", boxShadow: "0 18px 45px rgba(0,0,0,0.7)", overflow: "hidden", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 26px 60px rgba(144,238,144,0.35)"; e.currentTarget.style.borderColor = "rgba(200,255,200,0.9)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.7)"; e.currentTarget.style.borderColor = "rgba(144,238,144,0.4)"; }} onClick={() => onNavigate(`/shop/${encodeURIComponent(product.id)}`)}>
              {idx === 0 && <div style={{ position: "absolute", top: "-10px", right: "10px", background: "rgba(255,107,107,0.8)", color: "white", padding: "0.3rem 0.7rem", fontSize: "0.75rem", borderRadius: "2px", fontWeight: "bold", zIndex: 2 }}>-20%</div>}
              <div style={{ aspectRatio: '1/1', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden', containIntrinsicSize: '1/1' }}>
                <img src={product.image} alt={`Sản phẩm ${language === "vi" ? (product.name_vi || product.name) : product.name}`} width="250" height="250" loading="lazy" fetchpriority="low" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: "1.1rem", color: "white", marginBottom: '0.5rem' }}>{language === "vi" ? (product.name_vi || product.name) : product.name}</h3>
              <p style={{ color: "var(--accent)", fontWeight: "bold", marginBottom: '1rem' }}>{product.price} vnd</p>
              <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} style={{ width: '100%', padding: "0.75rem 1rem", background: "white", color: "black", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold" }}>Thêm Vào Giỏ</button>
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
        <button onClick={onShowPopup} style={{ padding: "1rem 2.5rem", background: "linear-gradient(135deg, rgba(100, 200, 100, 0.8), rgba(144, 238, 144, 0.6))", color: "white", border: "1px solid rgba(144, 238, 144, 0.4)", borderRadius: "50px", cursor: "pointer", fontWeight: "600", fontSize: "1rem", transition: "all 0.3s ease", textTransform: "uppercase", letterSpacing: "0.05em" }} onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(144, 238, 144, 0.9), rgba(200, 255, 200, 0.7))"; e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(144, 238, 144, 0.4)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(100, 200, 100, 0.8), rgba(144, 238, 144, 0.6))"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>👀 Xem Tất Cả Sản Phẩm Nổi Bật</button>
      </div>
    </div>
  </div>
));

export default FeaturedSheet;
