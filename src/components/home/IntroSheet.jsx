import React from "react";
import { Link } from "react-router-dom";

const IntroSheet = React.memo(({ style, t }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={style} className="sheet-content">
      <div className="container" style={{ 
        width: "100%", 
        position: "relative", 
        zIndex: 2, 
        userSelect: "none",
        paddingTop: isMobile ? "85px" : "0" /* Navbar is 60px height + 25px gap */
      }}>
        <div style={{ opacity: 1 }}>
          <h1 style={{ 
            fontSize: isMobile ? "1rem" : "clamp(2.5rem, 10vw, 6rem)", 
            lineHeight: 1.2, 
            letterSpacing: isMobile ? "0.15em" : "-0.02em", 
            color: "#FFA500", 
            margin: isMobile ? "0 0 1.5rem 0" : "0 0 0.5rem 0", 
            fontFamily: "'Audiowide', sans-serif", 
            textTransform: "uppercase", 
            textAlign: "left",
            textShadow: isMobile ? "0 0 8px rgba(255,165,0,0.2)" : "0 0 30px rgba(255,165,0,0.4)",
            opacity: 0.8
          }}>
            {t("shop_tagline")}
          </h1>
        </div>
        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", 
          marginTop: isMobile ? "2vh" : "4vh", 
          alignItems: isMobile ? "flex-start" : "flex-end", 
          borderTop: "1px solid rgba(255,255,255,0.1)", 
          paddingTop: "1rem" 
        }}>
          <p style={{ 
            maxWidth: isMobile ? "100%" : "500px", 
            fontSize: isMobile ? "0.95rem" : "1.1rem", 
            color: "var(--secondary)", 
            lineHeight: 1.4,
            marginBottom: isMobile ? "1.5rem" : 0
          }}>
            {t("hero_desc")}
          </p>
          <Link to="/shop" className="btn-primary" style={{ 
            padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem",
            width: isMobile ? "100%" : "auto",
            textAlign: "center"
          }}>
            {t("hero_cta")}
          </Link>
        </div>
      </div>
    </div>
  );
});

export default IntroSheet;
