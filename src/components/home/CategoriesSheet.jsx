import React from "react";

const SectionTitle = React.memo(({ children }) => (
  <h2
    style={{
      fontSize: "clamp(2rem, 5vw, 4rem)",
      textTransform: "uppercase",
      marginBottom: "2rem",
      borderTop: "1px solid rgba(255,255,255,0.2)",
      paddingTop: "1rem",
      color: "white",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
      fontWeight: 600,
      letterSpacing: "0.05em",
    }}
  >
    {children}
  </h2>
));

const CategoriesSheet = React.memo(({ style, dynamicCategories, onNavigate }) => (
  <div style={style} className="sheet-content">
    <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
      <SectionTitle>Danh Mục Sản Phẩm Chính</SectionTitle>
      <div className="grid-products">
        {dynamicCategories.length > 0 ? dynamicCategories.map((cat, idx) => (
          <div key={idx} style={{ position: "relative", background: "radial-gradient(circle at top, rgba(100,200,255,0.18), rgba(5,10,20,0.95))", border: "1px solid rgba(100,200,255,0.35)", padding: "2rem", textAlign: "center", cursor: "pointer", transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease", overflow: "hidden", borderRadius: "18px", boxShadow: "0 18px 45px rgba(0,0,0,0.6)" }} onClick={() => onNavigate(`/shop?category=${encodeURIComponent(cat.key)}`)} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 26px 60px rgba(0, 200, 255, 0.35)"; e.currentTarget.style.borderColor = "rgba(150,230,255,0.9)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 18px 45px rgba(0,0,0,0.6)"; e.currentTarget.style.borderColor = "rgba(100,200,255,0.35)"; }}>
            <div style={{ position: "absolute", inset: "-40%", background: "radial-gradient(circle at 0% 0%, rgba(0,220,255,0.16), transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.05), transparent 55%)", opacity: 0.6, pointerEvents: "none" }} />
            <div style={{ height: "170px", aspectRatio: "1.5 / 1", marginBottom: "0", overflow: "hidden", borderRadius: "4px", position: "relative", background: "rgba(0,0,0,0.1)" }}>
              <img src={cat.image} alt={`Danh mục ${cat.name}`} loading="lazy" fetchpriority="auto" decoding="async" width="300" height="200" style={{ position: "relative", width: "100%", height: "100%", objectFit: "contain", transform: "translateZ(0) scale(1.02)", transition: "transform 0.6s ease" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.0) 60%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "10px", textAlign: "left", color: "white" }}>
                <div style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", fontWeight: 700, lineHeight: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{cat.name}</div>
                <div style={{ fontSize: "clamp(0.75rem, 2vw, 0.9rem)", opacity: 0.8 }}>{cat.count} sản phẩm</div>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ padding: '8rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', width: '100%', gridColumn: '1 / -1', minHeight: '400px' }}>
            <h3>Chưa có danh mục sản phẩm nào</h3>
          </div>
        )}
      </div>
    </div>
  </div>
));

export default CategoriesSheet;
export { SectionTitle };
