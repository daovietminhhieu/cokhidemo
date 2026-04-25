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
        paddingTop: isMobile ? "100px" : "0", /* Slightly reduced top padding */
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: isMobile ? "auto" : "80vh"
      }}>
        <div style={{ opacity: 1, marginBottom: isMobile ? "0" : "5rem" }}> {/* Reduced from 2rem */}
          <h1 style={{ 
            fontSize: isMobile ? "12vw" : "clamp(3.5rem, 8vw, 8rem)", 
            lineHeight: 1.1, 
            letterSpacing: "-0.02em", 
            color: "#FFA500", 
            margin: "0", 
            fontFamily: "'Audiowide', sans-serif", 
            textTransform: "uppercase", 
            textAlign: "left",
            textShadow: "0 0 40px rgba(255,165,0,0.3)"
          }}>
            {t("shop_tagline")}
          </h1>
        </div>

        <div style={{ 
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", 
          alignItems: isMobile ? "flex-start" : "center", 
          borderTop: "1px solid rgba(255,255,255,0.15)", 
          paddingTop: isMobile ? "0" : "2.5rem", /* Reduced from 2.5rem */
          gap: isMobile ? "0" : "2rem" /* Reduced from 2rem */
        }}>
          <div style={{ maxWidth: isMobile ? "100%" : "600px" }}>
            <p style={{ 
              fontSize: isMobile ? "0" : "1.25rem", 
              color: "rgba(255,255,255,0.6)", 
              lineHeight: 1.6,
              margin: 0,
              fontWeight: 400
            }}>
              {t("hero_desc")}
            </p>
          </div>
          <Link to="/shop" className="btn-ghost" style={{ 
            padding: isMobile ? "1rem 2rem" : "1rem 2.5rem",
            width: isMobile ? "100%" : "auto",
            textAlign: "center",
            fontSize: "0.9rem",
            borderRadius: "4px",
            border: "1px solid #FFA500",
            color: "#FFA500",
            background: "transparent",
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "0.1em",
            transition: "all 0.3s ease",
            textDecoration: "none",
            display: "inline-block"
          }}>
            {t("hero_cta")}
          </Link>
        </div>
      </div>
    </div>
  );
});

export default IntroSheet;
