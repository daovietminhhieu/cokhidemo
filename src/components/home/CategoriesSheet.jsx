import React from "react";

const SectionTitle = React.memo(({ children }) => {
  const isMobile = window.innerWidth <= 768;
  return (
    <div style={{ marginBottom: isMobile ? "0" : "3rem" }}>
      <h2
        style={{
          fontSize: isMobile ? "1.75rem" : "clamp(2rem, 5vw, 3.5rem)",
          textTransform: "uppercase",
          color: "white",
          fontFamily: "'Audiowide', sans-serif",
          fontWeight: 400,
          letterSpacing: "0.02em",
        }}
      >
        {children}
      </h2>
      <div style={{ height: "4px", width: "60px", background: "#FFA500", marginTop: isMobile ? "-70px" : "1rem" }} />
    </div>
  );
});

const CategoriesSheet = React.memo(({ style, dynamicCategories, onNavigate }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={style} className="sheet-content">
      <div className="container" style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <SectionTitle>Danh Mục Chính</SectionTitle>
        <div className="" style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: isMobile ? "0.75rem" : "2rem",
           
        }}>
          {dynamicCategories.length > 0 ? dynamicCategories.map((cat, idx) => (
            <div 
              key={idx} 
              className="category-card" 
              style={{ 
                position: "relative", 
                background: "rgba(255, 255, 255, 0.03)", 
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                padding: isMobile ? "0.75rem" : "1.5rem", 
                cursor: "pointer", 
                transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)", 
                overflow: "hidden", 
                borderRadius: isMobile ? "16px" : "24px",
                backdropFilter: "blur(10px)"
              }} 
              onClick={() => onNavigate(`/shop?category=${encodeURIComponent(cat.key)}`)} 
              onMouseEnter={(e) => { 
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-10px)"; 
                  e.currentTarget.style.borderColor = "#FFA500";
                  e.currentTarget.style.background = "rgba(255, 165, 0, 0.05)";
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
              <div style={{ 
                height: isMobile ? "120px" : "200px", 
                marginBottom: isMobile ? "0.75rem" : "1.5rem", 
                overflow: "hidden", 
                borderRadius: isMobile ? "12px" : "16px", 
                background: "rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <img src={cat.image} alt={cat.name} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
              </div>
              <div style={{ textAlign: "left" }}>
                <h3 style={{ fontSize: isMobile ? "0.9rem" : "1.25rem", fontWeight: 700, color: "white", marginBottom: "0.25rem" }}>{cat.name}</h3>
                <p style={{ fontSize: isMobile ? "0.75rem" : "0.9rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>{cat.count} sản phẩm</p>
              </div>
            </div>
          )) : (
            <div style={{ padding: '4rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
              <p>Chưa có danh mục nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CategoriesSheet;
export { SectionTitle };
